import { fetchSolarForecast } from "../services/solarForecastService.js";
import { TimeSlot } from "../model/timeSlot.js";


async function solarForecastApiTest(){
    fetchSolarForecast(51.6438, 10.2553, 50, 50, 10)
        .then(response => {
            console.log(response);

            const jsonResponse = response;

            const timeSlots = TimeSlot.fromJsonResponse(jsonResponse);

            // timeSlots.forEach(timeSlot => timeSlot.print());
        })
        .catch(error => console.error("error while requesting", error));
}

export { solarForecastApiTest };
