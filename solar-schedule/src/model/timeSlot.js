export class TimeSlot {
  constructor(timestamp, availablePower) {
    this.timestamp = timestamp;
    this.availablePower = availablePower;
    this.remainingPower = availablePower;
    this.boughtPower = 0;
  }

  calculateRemainingAndBoughtPower(device) {
    const requiredPower = device.consumptionPerHour / 2; //for time slot each half an hour
    this.remainingPower -= requiredPower;
    if (this.remainingPower < 0) {
      this.boughtPower = -this.remainingPower;
      this.remainingPower = 0;
    }
  }

  print() {
    console.log(
      this.timestamp.toLocaleString() +
        " - Remaining Power: " +
        this.remainingPower +
        " kWh, Available Power: " +
        this.availablePower +
        " kWh, Bought Power: " +
        this.boughtPower +
        " kWh"
    );
  }

  static fromJsonResponse(response) {
    const timeSlots = [];
    Object.keys(response.result).forEach((key, index, array) => {
      const timestamp = new Date(key);
      const power = response.result[key];

      if (index > 0 && index < array.length - 1) {
        timeSlots.push(new TimeSlot(timestamp, power));
      }
    });

    return TimeSlot.fillMissingTimeSlots(timeSlots);
  }

  static fillMissingTimeSlots(timeSlots) {
    const filledTimeSlots = [];
    const days = TimeSlot.groupTimeSlotsByDay(timeSlots);

    days.forEach((dayTimeSlots) => {
      for (let hour = 0; hour < 24; hour += 0.5) {
        const expectedTime = new Date(dayTimeSlots[0].timestamp);
        expectedTime.setHours(hour, (hour % 1) * 60, 0, 0);

        const existingSlot = dayTimeSlots.find(
          (slot) => slot.timestamp.getTime() === expectedTime.getTime()
        );
        filledTimeSlots.push(existingSlot || new TimeSlot(expectedTime, 0));
      }
    });

    return filledTimeSlots;
  }

  static groupTimeSlotsByDay(timeSlots) {
    let days = [];
    let currentDay = [];
    let currentDate = null;

    timeSlots.forEach((timeSlot) => {
      if (
        !currentDate ||
        currentDate.getDate() !== timeSlot.timestamp.getDate()
      ) {
        if (currentDay.length > 0) {
          days.push(currentDay);
        }
        currentDay = [];
        currentDate = new Date(timeSlot.timestamp);
      }
      currentDay.push(timeSlot);
    });

    if (currentDay.length > 0) {
      days.push(currentDay);
    }

    return days;
  }
}
