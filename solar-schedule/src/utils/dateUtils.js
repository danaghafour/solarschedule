//format js Date so its compatible with co2 API
function formatDateToC02ApiFormat(date) {
    if (!(date instanceof Date)) {
        throw new Error("argument is no date object");
    }

    const pad = (num) => num.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function getLastMonday() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

function getStartOfMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);
}

function getStartOfYear() {
    const date = new Date();
    return new Date(date.getFullYear(), 0, 1, 0, 0, 0);
}

export {
    formatDateToC02ApiFormat,
    getLastMonday,
    getStartOfMonth,
    getStartOfYear,
};
