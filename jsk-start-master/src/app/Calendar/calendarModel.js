import { Calendar } from "calendar"
import * as data from "./data"

const FIRST_DAY = 1;
const DIFF_BETWEEN_JS_AND_HUMAN_MONTH = 1;
const ID_EVENT_FACTOR = 1e8;
const ID_YEAR_FACTOR = 1e4;
const ID_MONTH_FACTOR = 1e2;

let allEvents = data.sampleDataMap;

export const calendar = new Calendar(FIRST_DAY);

const validateYear = (year) => {
    if (year < 1900 || year > 2100) {
        throw new Error('InvalidYearNo');
    }
}
const validateMonth = (month) => {
    if (month < 0 || month > 11) {
        throw new Error('InvalidMonthNo');
    }
}
const validateDay = (day) => {
    if (day < 0 || day > 31) {
        throw new Error('InvalidDayNo');
    }
}

export const getEvents = (year, month) => {
    validateYear(year);
    validateMonth(month);

    let allEventsInMonth = new Map();
    let monthId = year * ID_YEAR_FACTOR + (month + DIFF_BETWEEN_JS_AND_HUMAN_MONTH) * ID_MONTH_FACTOR;
    for (const eventDate of allEvents.keys()) {
        if (monthId / ID_MONTH_FACTOR == Math.trunc(eventDate / ID_MONTH_FACTOR)) {
            allEventsInMonth.set(eventDate, allEvents.get(eventDate));
        }
    }
    return allEventsInMonth;
}

export const deleteEvent = (eventId) => {
    if (!allEvents.has(eventId % ID_EVENT_FACTOR) || allEvents.get(eventId % ID_EVENT_FACTOR).length < (Math.trunc(eventId / ID_EVENT_FACTOR))) {
        throw new Error('ThereIsNoEventWithSpecifiedId');
    }

    allEvents.get(eventId % ID_EVENT_FACTOR).splice(Math.trunc(eventId / ID_EVENT_FACTOR), 1);
}

export const addEvent = (dayId, event) => {
    validateYear(Math.trunc(dayId / ID_YEAR_FACTOR));
    validateMonth(Math.trunc(dayId / ID_MONTH_FACTOR) % ID_MONTH_FACTOR);
    validateDay(dayId % ID_MONTH_FACTOR);

    if (event.title == null || event.title == '') {
        throw new Error('TitleFieldIsEmpty');
    }
    if (event.place == null || event.place == '') {
        throw new Error('PlaceFieldIsEmpty');
    }

    let dayEvents = [];
    if (allEvents.has(dayId)) {
        dayEvents = allEvents.get(dayId);
    }
    dayEvents.push(event);
    allEvents.set(dayId, dayEvents);
}



