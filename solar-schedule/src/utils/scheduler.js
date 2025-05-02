import { TimeFrame } from "../model/timeFrame.js";

function findBestTimeFramePerPeriod(timeSlots, device) {
  let bestTimeFrame = null;
  let maxTotalRemainingPower = -Infinity;
  let durationInHours = device.durationHours;
  if (device.durationMinutes === 30) {
    durationInHours = durationInHours + 0.5;
  }

  for (let i = 0; i <= timeSlots.length - durationInHours * 2; i++) {
    let totalRemainingPower = 0;

    for (let j = 0; j < durationInHours * 2; j++) {
      if (i + j < timeSlots.length) {
        totalRemainingPower += timeSlots[i + j].remainingPower;
      } else {
        break;
      }
    }

    if (totalRemainingPower > maxTotalRemainingPower) {
      bestTimeFrame = new TimeFrame(
        timeSlots[i].timestamp,
        new Date(
          timeSlots[i].timestamp.getTime() + durationInHours * 60 * 60 * 1000
        )
      );
      maxTotalRemainingPower = totalRemainingPower;
    }
  }

  if (!bestTimeFrame) {
    console.log(
      "[findBestTimeFramePerPeriod] No TimeFrame found. returning null."
    );
  }

  return bestTimeFrame;
}

function scheduleSingleDeviceForOneDay(timeSlots, device) {
  const timeSlotsPerHour = 2; // 2 TimeSlots per hour
  const timeSlotsPerPeriod = device.frequency * timeSlotsPerHour;
  const periodsPerDay = 24 / device.frequency;
  const bestTimeFrames = [];

  for (let period = 0; period < periodsPerDay; period++) {
    const segmentStartIndex = period * timeSlotsPerPeriod;
    const segmentEndIndex = segmentStartIndex + timeSlotsPerPeriod;

    if (segmentEndIndex <= timeSlots.length) {
      const segmentTimeSlots = timeSlots.slice(
        segmentStartIndex,
        segmentEndIndex
      );

      const bestTimeFrame = findBestTimeFramePerPeriod(
        segmentTimeSlots,
        device
      );
      if (bestTimeFrame) {
        bestTimeFrames.push(bestTimeFrame);
        for (const element of segmentTimeSlots) {
          if (
            element.timestamp >= bestTimeFrame.start &&
            element.timestamp < bestTimeFrame.stop
          ) {
            element.calculateRemainingAndBoughtPower(device);
          }
        }
      }
    }
  }
  return bestTimeFrames;
}

function scheduleDevicesFor3Days(timeSlots, devices) {
  //delete planned schedule to prevent double scheduling
  devices.forEach((device) => {
    device.schedule = [];
  });
  const timeSlotsPerDay = 24 * 2;
  const numberOfDays = timeSlots.length / timeSlotsPerDay;

  //start with devices with  highest totalConsumption
  devices.sort((a, b) => b.totalConsumption - a.totalConsumption);

  //loop over each day in timeSlots
  for (let day = 0; day < numberOfDays; day++) {
    const dayStartIndex = day * timeSlotsPerDay;
    const dayEndIndex = dayStartIndex + timeSlotsPerDay;
    const timeSlotsForDay = timeSlots.slice(dayStartIndex, dayEndIndex);

    devices.forEach((device) => {
      const bestTimeFrames = scheduleSingleDeviceForOneDay(
        timeSlotsForDay,
        device
      );
      device.updateTimeFrames(bestTimeFrames);
    });
  }
}

export default { scheduleDevicesFor3Days };
