/**
 * @constructor
 * @param {string} name - The name of the device.
 * @param {number} consumptionPerHour - The power consumption per hour in kWh.
 * @param {number} duration - in hours
 * @param {string} frequency - in hours
 */

export class Device {
    constructor(
        name,
        consumptionPerHour,
        durationHours,
        durationMinutes,
        frequency
    ) {
        this.name = name;
        this.consumptionPerHour = parseInt(consumptionPerHour);
        this.durationHours = parseInt(durationHours); // in hours
        this.durationMinutes = parseInt(durationMinutes);
        this.frequency = parseInt(frequency); // in hours
        this.totalConsumption = this.consumptionPerHour * (this.durationHours + (this.durationMinutes===30? 0.5: 0)) ;
        this.schedule = []; // array of timeFrames
    }

    updateTimeFrames(timeFrames) {
        timeFrames.forEach((timeFrame) => {
            this.schedule.push(timeFrame);
        });
    }

    printSchedule() {
        if (this.schedule.length > 0) {
            this.schedule.forEach((timeFrame) => {
                console.log(
                    `device ${this.name} scheduled from ${timeFrame.start} till ${timeFrame.stop}`
                );
            });
        } else {
            console.log(`device ${this.name}  couldnt be scheduled`);
        }
    }

    printDevice() {
        console.log(
            `Device Name: ${this.name}, ` +
        `Consumption per Hour: ${this.consumptionPerHour} kWh, ` +
        `Duration hours: ${this.durationHours} ` +
        `Duration minutes: ${this.durationMinutes}` +
        `Frequency: ${this.frequency}`
        );
    }
}
