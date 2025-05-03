# Solar Schedule

🔗 Live App: [https://solar-schedule-iprog.web.app/](https://solar-schedule-iprog.web.app/)

## Overview

The website allows users to create a schedule for their electrical devices to be powered by their own solar system. The schedule will be calculated using the solar forecast and simple timing requirements provided by the user.

This is a simple demand-side management tool. It helps optimize when electrical devices run to best utilize solar energy and reduce reliance on grid electricity. Users input device durations, usage frequency, and energy consumption. The app calculates an optimal schedule based on solar forecasts and shows estimated electricity cost and CO2 emissions.

> ⚠️ CO2 data is currently only available for users in Germany due to limitations in the data provider (EnergyQuantified).

---

## Running the App

```bash
cd solar-schedule
npm install
npm start
```

---

## Example Use Case

A production plant has solar panels on the roof and buys electricity from the grid when solar power isn't sufficient. Machines in the plant don't need to run all day and can be scheduled.

For example:

* Machine A: runs daily for 3h and uses 10kWh
* Machine B: runs every 3 days for 8h and uses 30kWh

The app calculates the best time to run these machines based on the solar forecast over the next 3 days (via the [forecast.solar](https://forecast.solar/) API), minimizing cost and emissions.

---

## Contributors

This project was developed by **Group 11** as part of the DH2642 course:

* **Dana Ghafour Fatulla**
* **Dániel Hajós**
* **Sebastián Elías Jofré Machuca**
* **Leon Marius Moll**

---

## Technologies & APIs Used

* **Frontend**: React
* **Backend/Hosting**: Firebase
* **APIs**:

  * [Forecast.Solar](https://forecast.solar/) – for solar energy forecast
  * EnergyQuantified – for CO2/kWh in the German energy grid

---

## Data Handled

* **From APIs**

  * Solar energy forecast
  * CO2 emissions (Germany only)

* **Static User Input**

  * Location
  * Electricity prices
  * Solar panel configuration

* **Dynamic User Input**

  * Device durations & frequencies
  * Device energy usage

* **Calculated**

  * Optimal schedule
  * Estimated electricity cost
  * Estimated CO2 emissions

---

## App Views

* Login
* Device List (Add/Edit/Delete/Activate)
* Solar Setup
* Schedule (Time Table View)
* History (Electricity Costs, CO2 Emissions)
* Optional: Cost and CO2 graphs
