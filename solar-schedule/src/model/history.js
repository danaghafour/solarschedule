import { fetchCO2 } from "../services/co2Service.js";
import {
  formatDateToC02ApiFormat,
  getLastMonday,
  getStartOfMonth,
  getStartOfYear,
} from "../utils/dateUtils.js";
import resolvePromise from "../utils/resolvePromise.js";

export class History {
  constructor() {
    this.lastUpdatedWithDataFrom = new Date();
    this.week = {
      start: getLastMonday(),
      totalCO2: 0,
      averageCO2: 0,
      totalBoughtkWh: 0,
      totalElectricityPrice: 0,
      averageElectricityPrice: 0,
      consumedPower: 0,
    };
    this.month = {
      start: getStartOfMonth(),
      totalCO2: 0,
      averageCO2: 0,
      totalBoughtkWh: 0,
      totalElectricityPrice: 0,
      averageElectricityPrice: 0,
      consumedPower: 0,
    };
    this.year = {
      start: getStartOfYear(),
      totalCO2: 0,
      averageCO2: 0,
      totalBoughtkWh: 0,
      totalElectricityPrice: 0,
      averageElectricityPrice: 0,
      consumedPower: 0,
    };
  }
}

let co2APIPromiseState = {};

function calculateHistory(history, oldForecast, price) {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  const yesterdayMidnight = new Date(midnight.getTime() - 24 * 60 * 60 * 1000);
  //only update if not already updated today
  if (history.lastUpdatedWithDataFrom < yesterdayMidnight) {
    const timeSlotsOlderMidnight = oldForecast.filter((timeSlot) => {
      const timeSlotDate = new Date(timeSlot.timestamp);
      //make sure it only calculates with data from older than today AND data that it not already took into account
      return (
        timeSlotDate < midnight &&
        timeSlotDate > history.lastUpdatedWithDataFrom
      );
    });
    updateHistory(history, timeSlotsOlderMidnight, price);
    history.lastUpdatedWithDataFrom =
      timeSlotsOlderMidnight[timeSlotsOlderMidnight.length - 1].timestamp;
  }
}

function updateHistory(history, timeSlots, price) {
  if (getLastMonday() > history.week.start) {
    resetPeriod(getLastMonday(), history.week);
  }
  if (getStartOfMonth() > history.month.start) {
    resetPeriod(getStartOfMonth(), history.month);
  }
  if (getStartOfYear() > history.year.start) {
    resetPeriod(getStartOfYear(), history.year);
  }

  timeSlots.forEach((timeSlot) => {
    if (timeSlot.boughtPower !== 0) {
      let start = timeSlot.timestamp;
      let end = new Date(start);
      end.setMinutes(start.getMinutes() + 30);
      resolvePromise(
        fetchCO2(
          formatDateToC02ApiFormat(start),
          formatDateToC02ApiFormat(end),
          timeSlot.boughtPower
        ),
        co2APIPromiseState,
        () => {
          updatePeriods(
            history,
            co2APIPromiseState.data["co2"],
            timeSlot.boughtPower,
            timeSlot.availablePower -
              timeSlot.remainingPower +
              timeSlot.boughtPower,
            price
          );
        }
      );
    } else {
      //no electricity was bought, only solar power was used
      updatePeriods(
        history,
        0,
        0,
        timeSlot.availablePower -
          timeSlot.remainingPower +
          timeSlot.boughtPower,
        price
      );
    }
  });
}

function resetPeriod(start, period) {
  period.start = start;
  period.totalCO2 = 0;
  period.averageCO2 = 0;
  period.totalBoughtkWh = 0;
  period.totalElectricityPrice = 0;
  period.averageElectricityPrice = 0;
  period.consumedPower = 0;
}

function updatePeriods(history, CO2, boughtPower, consumedPower, price) {
  updatePeriod(history.week, CO2, boughtPower, consumedPower, price);
  updatePeriod(history.month, CO2, boughtPower, consumedPower, price);
  updatePeriod(history.year, CO2, boughtPower, consumedPower, price);
}

function updatePeriod(period, CO2, boughtPower, consumedPower, price) {
  period.totalBoughtkWh += boughtPower;
  period.consumedPower += consumedPower;
  period.totalCO2 += CO2;
  period.averageCO2 =
    period.consumedPower > 0 ? period.totalCO2 / period.consumedPower : 0;
  period.totalElectricityPrice += boughtPower * price;
  period.averageElectricityPrice =
    period.consumedPower > 0
      ? period.totalElectricityPrice / period.consumedPower
      : 0;
}

function printHistory() {
  console.log("Weekly History:", this.week);
  console.log("Monthly History:", this.month);
  console.log("Yearly History:", this.year);
}

export { calculateHistory, printHistory };
