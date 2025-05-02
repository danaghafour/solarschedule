import Scheduler from "../utils/scheduler.js";
import { Device } from "./device.js";
import { History } from "./history.js";
import areCoordinatesInGermany from "../utils/checkCoordinates.js";
import fetchSolarForecast from "../services/solarForecastService.js";
import { TimeSlot } from "./timeSlot.js";
import {
  getChachedForecast,
  cacheForecast,
  isForecastCacheValid,
  clearForecastCache,
} from "../utils/cache.js";
import resolvePromise from "../utils/resolvePromise.js";

export default {
  devices: [],
  solarSetup: {
    declination: 0.0,
    azimuth: 0.0,
    kwp: 0.0,
  },
  pricePerkwH: 0,
  history: new History(),
  solarForecast: [], // array of timeSlots
  latitude: 0.0,
  longitude: 0.0,
  solarAPIPromiseState: {},

  schedule() {
    if (this.solarSetup.kwp !== 0.0)
      if (isForecastCacheValid()) {
        this.solarForecast = getChachedForecast();
        this.createSchedule();
      } else {
        // (0.0, 0.0) is considered invalid by the forecast api
        if (this.latitude === 0.0 && this.longitude === 0.0) {
          return;
        }
        resolvePromise(
          fetchSolarForecast(
            this.latitude,
            this.longitude,
            this.solarSetup.azimuth,
            this.solarSetup.declination,
            this.solarSetup.kwp
          ),
          this.solarAPIPromiseState,
          () => {
            this.solarForecast = TimeSlot.fromJsonResponse(
              this.solarAPIPromiseState.data
            );
            cacheForecast(this.solarForecast);
            this.createSchedule();
          }
        );
      }
  },

  createSchedule() {
    if (this.devices.length > 0) {
      Scheduler.scheduleDevicesFor3Days(this.solarForecast, this.devices);
    }
  },

  //called by DeviceManagement
  addDevice(name, consumption, durationHours, durationMinutes, frequency) {
    if (!name) {
      console.error("Device name must not be null!");
      return;
    }

    if (!consumption) {
      console.error("Device consumption must not be null!");
      return;
    }

    if (!durationHours) {
      console.error("Device durationHours must not be null!");
      return;
    }

    if (!frequency) {
      console.error("Device frequency must not be null!");
      return;
    }

    if (!this.isDeviceNameUnique(name)) {
      console.error("Device name must be uniqe!");
      return;
    }

    this.devices.push(
      new Device(name, consumption, durationHours, durationMinutes, frequency)
    );
    this.schedule();
  },

  //called by DeviceManagement
  editDevice(
    name,
    newConsumption,
    newDurationHours,
    newDurationMinutes,
    newFrequency
  ) {
    const device = this.devices.filter((dev) => dev.name === name);
    if (device.length === 0) {
      console.error("Device not found.");
      return;
    }

    device[0].consumptionPerHour = newConsumption;
    device[0].durationHours = newDurationHours;
    device[0].durationMinutes = newDurationMinutes;
    device[0].frequency = parseInt(newFrequency);
    this.schedule();
  },

  //called by DeviceManagement
  isDeviceNameUnique(name) {
    return this.devices.filter((dev) => dev.name === name).length === 0;
  },

  //called by Devices
  deleteDevice(name) {
    const index = this.devices.map((dev) => dev.name).indexOf(name);
    if (index > -1) {
      this.devices.splice(index, 1);
    } else {
      console.error(`Could not delete device, device name '${name}'not found.`);
    }
    this.schedule();
  },

  //called by Settings
  editLocation(lat, long) {
    if (!areCoordinatesInGermany(lat, long)) {
      throw new Error("Coordinates must be in Germany.");
    }
    this.latitude = lat;
    this.longitude = long;
    clearForecastCache(); // the forecast has to be fetched again for the new location
    this.schedule();
  },

  //called by Settings
  editElectricityPrice(price) {
    if (!price || price < 0.0) {
      console.error("Electricity price must be positive a number.");
      return;
    }
    this.pricePerkwH = price;
  },

  addSolarPanel(declination, azimuth, kwp) {
    this.solarSetup = {
      declination: declination,
      azimuth: azimuth,
      kwp: kwp,
    };
    clearForecastCache(); // the forecast has to be fetched again for the new panel
    this.schedule();
  },

  //called by Settings
  // if a property is not modified null should be passed
  editSolarSetup(declination, azimuth, kwp) {
    if (declination) {
      this.solarSetup.declination = declination;
    }

    if (azimuth) {
      this.solarSetup.azimuth = azimuth;
    }

    if (kwp) {
      this.solarSetup.kwp = kwp;
    }
    clearForecastCache(); // the forecast has to be fetched again for the new panel
    this.schedule();
  },

  reset() {
    this.devices = [];
    this.solarSetup = {
      declination: 0.0,
      azimuth: 0.0,
      kwp: 0.0,
    };
    this.pricePerkwH = null;
    this.solarForecast = [];
    this.latitude = 0.0;
    this.longitude = 0.0;
  },
};
