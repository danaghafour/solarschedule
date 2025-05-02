# Solar schedule

https://solar-schedule-iprog.web.app/

## Overview

The website allows users to create a schedule for their electrical devices to be powered by their own solar system. The schedule will be calculated using the solar forecast and simple timing requirements provided by the user.

## Running the app

`cd solar-schedule`

`npm i`

`npm start`

## Example

Following is a example use case for better understanding:
A production plant has solar on the roof and buys electricity when the solar on the roof can't cover the consumption from the grid. The plant has some machines, which dont run all day. The machines can be scheduled. For example machine A has to run everyday for 3h and uses 10kwH and machine B has to run every 3 days for 8h and uses 30kwH. Now the best schedule has to be found to use the free electricity from the solar panel the most efficient way. The data of how much power the solar system is producing is provided by the forecast.solar API. From that we get a time series for the this and the next 2 days. Then the schedule is calculated and presented in a time table. This way the user only has to provide the machines and how long and often they have to get used. We then provide a schedule with the optimal times to let them run. We will also provide a history with the electricity cost in the last week/month/year and the consumed CO2 based on the electricity in the grid. We get the data for the CO2 from EnergyQuantified. Unfortunately this data is only available in Germany. The tool can still be used everywhere to find the best schedule, but the CO2 calculations will only be accessible if the location is in Germany.