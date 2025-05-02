import { TimeSlot } from "../model/timeSlot.js";

import { History } from "../model/history.js";

function createTimeslots() {
    const timeSlots = [];
    const startHour = new Date(2023, 11, 13, 0, 0);

    const endHour = new Date(2023, 11, 13, 23, 30);

    for (
        let time = startHour;
        time <= endHour;
        time.setMinutes(time.getMinutes() + 30)
    ) {
        const slot = new TimeSlot(new Date(time), 10);

        if (
            (time.getHours() >= 0 && time.getHours() < 3) ||
      (time.getHours() >= 18 && time.getHours() < 21)
        ) {
            slot.remainingPower = 0;
            slot.boughtPower = 1;
        }

        timeSlots.push(slot);
    }

    return timeSlots;
}

function historyTest(price) {
    const testTimeSlots = createTimeslots();

    console.log(testTimeSlots);

    const history = new History();

    history.calculateHistory(testTimeSlots, price);

    history.print();
}

export { historyTest };
