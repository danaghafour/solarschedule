
import { PROXY_URL } from "../proxyConfig";

export default function fetchSolarForecast(lat, long, azimuth, declination, kpw1) {
    function handleErrorACB(error) {
        throw new Error("Could not fetch solar forecast: " + error);
    }

    function getJsonACB(res) {
        if (!res.ok) {
            return res.text().then(text => { throw new Error(text); });
        }
        return res.json();
    }

    const url = `${PROXY_URL}/solarapi/${lat}/${long}/${declination}/${azimuth}/${kpw1}`;

    return fetch(
        url,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest" // needed for the cors-anywhere proxy
            }
        }).then(getJsonACB)
        .catch(handleErrorACB);
}
