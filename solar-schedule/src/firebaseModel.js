import { ref, get, set } from "firebase/database";
import { Device } from "./model/device";
import { History, calculateHistory } from "./model/history";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";

/*Parts of this file was taken from the lab */

function getUserPath() {
    const user = getAuth().currentUser;
    return user ? `schedulerModel/${user.uid}` : '';
}

function modelToPersistence(model) {
    return {
        devices: model.devices.map((device) => ({
            name: device.name,
            consumptionPerHour: device.consumptionPerHour,
            durationHours: device.durationHours,
            durationMinutes: device.durationMinutes || 0,
            frequency: device.frequency,
        })),
        history: {
            ...model.history,
            lastUpdatedWithDataFrom:
        model.history.lastUpdatedWithDataFrom.toISOString(),
        },
        solarSetup: model.solarSetup,
        pricePerkwH: model.pricePerkwH,
        latitude: model.latitude,
        longitude: model.longitude,
        //only uploading parts of forecast where something is scheduled, this is determined by checking if energy is used
        solarForecastForHistory: model.solarForecast
            .filter((slot) => slot.availablePower !== slot.remainingPower)
            .map((slot) => ({
                timestamp: slot.timestamp.toISOString(),
                availablePower: slot.availablePower,
                remainingPower: slot.remainingPower,
                boughtPower: slot.boughtPower,
            })),
    };
}

function persistenceToModel(data, model) {
    if (data) {
        if (data.devices) {
            model.devices = data.devices.map(
                (deviceData) =>
                    new Device(
                        deviceData.name,
                        deviceData.consumptionPerHour,
                        deviceData.durationHours,
                        deviceData.durationMinutes,
                        deviceData.frequency
                    )
            );
        }
        model.solarSetup = data.solarSetup;
        model.pricePerkwH = data.pricePerkwH;
        model.latitude = data.latitude;
        model.longitude = data.longitude;
        if (data.history) {
            model.history = {
                ...data.history,
                lastUpdatedWithDataFrom: new Date(data.history.lastUpdatedWithDataFrom),
            };
        }
        if (data.solarForecastForHistory) {
            model.solarForecast = data.solarForecastForHistory.map((slot) => ({
                timestamp: new Date(slot.timestamp),
                availablePower: slot.availablePower,
                remainingPower: slot.remainingPower,
                boughtPower: slot.boughtPower,
            }));
            calculateHistory(model.history, model.solarForecast, model.pricePerkwH);
        }
        if (data.devices && data.solarSetup && data.latitude && data.longitude) {
            model.schedule();
        }
    } else {
        model.devices.push(new Device("Device 1", 5, 2, 0, 24));
        model.devices.push(new Device("Device 2", 20, 3, 30, 12));
        model.solarSetup = { declination: 30, azimuth: 30, kwp: 30 };
        model.latitude = 51.6438;
        model.longitude = 10.2553;
        model.pricePerkwH = 0.3;
        model.history = new History();
        model.schedule();
        saveToFirebase(model);
    }
}

function saveToFirebase(model) {
    if (model.ready && getAuth().currentUser) {
        const dataToSave = modelToPersistence(model);
        const path = getUserPath();
        return set(ref(db, path), dataToSave);
    }
}

function readFromFirebase(model) {
    model.ready = false;
    const path = getUserPath();
    const userRef = ref(db, path);

    return get(userRef)
        .then((snapshot) => {
            return persistenceToModel(snapshot.val(), model);
        })
        .then(() => {
            model.ready = true;
        })
        .catch((error) => {
            console.log("Error reading from Firebase:", error);
            model.ready = true;
        });
}

function connectToFirebase(model, watchFunction) {
    model.ready = false;

    readFromFirebase(model).then(() => {
        model.ready = true;

        let lastState = modelToPersistence(model);

        function checkForChanges() {
            const currentState = modelToPersistence(model);
            if (JSON.stringify(currentState) !== JSON.stringify(lastState)) {
                lastState = currentState;
                return currentState;
            }
            return lastState;
        }

        function saveChanges() {
            if (model.ready) {
                saveToFirebase(model);
            }
        }

        watchFunction(checkForChanges, saveChanges);
    });
}

export {
    modelToPersistence,
    persistenceToModel,
    saveToFirebase,
    readFromFirebase,
    connectToFirebase,
};
