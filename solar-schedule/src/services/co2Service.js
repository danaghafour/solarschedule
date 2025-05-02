import { PROXY_URL } from "../proxyConfig.js";

function fetchCO2(start, end, consumption) {
  function handleErrorACB(error) {
    throw new Error("Could not fetch co2 " + error);
  }

  function getJsonACB(res) {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return res.json();
  }

  const url = `?start=${encodeURIComponent(start)}&end=${encodeURIComponent(
    end
  )}&consumption=${encodeURIComponent(consumption)}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return fetch(PROXY_URL + "/co2api/" + url, options)
    .then(getJsonACB)
    .catch(handleErrorACB);
}

export { fetchCO2 };
