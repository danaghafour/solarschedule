import { TimeSlot } from "../model/timeSlot";

const FORECAST_KEY = "forecast";
const TIMESTAMP_KEY = "forecast_timestamp";
const CACHE_VALIDITY_MINUTES = 30;

function cacheForecast(schedule) {
    globalThis.localStorage.setItem(FORECAST_KEY, JSON.stringify(schedule));
    globalThis.localStorage.setItem(TIMESTAMP_KEY, new Date().getTime());
}

function getChachedForecast() {
    const value = globalThis.localStorage.getItem(FORECAST_KEY);
    if(!value){
        return null;
    }

    const parsed=JSON.parse(value);
    const slots=[];

    for(let i=0;i<parsed.length;i++){
        slots.push(new TimeSlot(new Date(parsed[i].timestamp),parsed[i].availablePower));
    }
    return slots;
}

function isForecastCacheValid() {
    const timestamp = globalThis.localStorage.getItem(TIMESTAMP_KEY);
    if (!timestamp) {
        return false;
    }
    return Math.floor((new Date().getTime() - timestamp) / (1000 * 60)) < CACHE_VALIDITY_MINUTES;
}

function clearForecastCache(){
    globalThis.localStorage.removeItem(FORECAST_KEY);
    globalThis.localStorage.removeItem(TIMESTAMP_KEY);
}

export {cacheForecast, getChachedForecast, isForecastCacheValid, clearForecastCache};
