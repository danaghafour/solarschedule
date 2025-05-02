import { Device } from "../model/device.js";
import { TimeSlot } from "../model/timeSlot.js";
import Scheduler from "../utils/scheduler.js";

/* ----------------scheduleSingleDeviceForOneDay Test-------------------- */

// let device = new Device("Device A", 400, 1, 24);
// let deviceA = new Device("Device A", 10, 1, 24);

// let timeSlots = [];
// for (let i = 0; i < 96; i++) {
//   timeSlots.push(
//     new TimeSlot(new Date(2023, 5, 22, 0, 15 * i), i) //Math.random() * 10 + 5
//   ); // Zufällige verbleibende Leistung
// }

// timeSlots.forEach((slot) => {
//   slot.print();
// });

// Scheduler.scheduleSingleDeviceForOneDay(timeSlots, device);

// Scheduler.scheduleSingleDeviceForOneDay(timeSlots, deviceA);

// if (device.schedule.length > 0) {
//   device.schedule.forEach((timeFrame) => {
//     console.log(`Gerät geplant von ${timeFrame.start} bis ${timeFrame.stop}`);
//   });
// } else {
//   console.log("Das Gerät konnte nicht geplant werden.");
// }

// timeSlots.forEach((slot) => {
//   slot.print();
// });

/* ----------------scheduleDevicesForMultipleDays Test-------------------- */

let deviceB = new Device("Device B", 100, 3,0, 8);
let deviceC = new Device("Device C", 20, 2,0, 24);
let deviceD = new Device("Device D", 100, 1,0, 24);
let devices = [deviceB, deviceC, deviceD];
let timeSlots3Days = [];

for (let i = 0; i < 144; i++) { // 3 Tage * 24 Stunden * 2 TimeSlots pro Stunde = 144
    let dayOffset = Math.floor(i / 96); // 96 TimeSlots pro Tag

    let hours = Math.floor((i % 96) / 2); // 2 TimeSlots pro Stunde
    let minutes = (i % 2) * 30; // TimeSlot alle 30 Minuten

    timeSlots3Days.push(
        new TimeSlot(new Date(2023, 5, 22 + dayOffset, hours, minutes), i)
    );
}

timeSlots3Days.forEach((slot) => {
    slot.print();
});

Scheduler.scheduleDevicesFor3Days(timeSlots3Days, devices);

devices.forEach((device) => {
    if (device.schedule.length > 0) {
        device.schedule.forEach((timeFrame) => {
            console.log(
                `device ${device.name} scheduled from ${timeFrame.start} till ${timeFrame.stop}`
            );
        });
    } else {
        console.log("device couldnt be scheduled");
    }
});

timeSlots3Days.forEach((slot) => {
    slot.print();
});


// console.log("-------------scheduling again with new timeSlots--------------");

// let timeSlots3DaysDescending = [];
// for (let i = 0; i < 144; i++) {
//   let dayOffset = Math.floor(i / 96);
//   let hours = Math.floor((i % 96) / 2);
//   let minutes = (i % 2) * 30;

//   timeSlots3DaysDescending.push(
//     new TimeSlot(new Date(2023, 5, 22 + dayOffset, hours, minutes), 300 - i)
//   );
// }

// // timeSlots3DaysDescending.forEach((slot) => {
// //   slot.print();
// // });

// Scheduler.scheduleDevicesFor3Days(timeSlots3DaysDescending, devices);

// devices.forEach((device) => {
//   if (device.schedule.length > 0) {
//     device.schedule.forEach((timeFrame) => {
//       console.log(
//         `device ${device.name} scheduled from ${timeFrame.start} till ${timeFrame.stop}`
//       );
//     });
//   } else {
//     console.log("device couldnt be scheduled");
//   }
// });

// // timeSlots3DaysDescending.forEach((slot) => {
// //   slot.print();
// // });
