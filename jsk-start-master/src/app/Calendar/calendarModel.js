import { Calendar } from "calendar"
import * as data from "./data"

const FIRST_DAY = 1;
const DIFF_BETWEEN_JS_AND_HUMAN_MONTH = 1;
const ID_EVENT_FACTOR = 1e8;
const ID_YEAR_FACTOR = 1e4;
const ID_MONTH_FACTOR = 1e2;

let allEvents = data.sampleDataMap;

export const calendar = new Calendar(FIRST_DAY);

export const getEvents = (year, month) => {
    let allEventsInMonth = new Map();
    let dayId = year * ID_YEAR_FACTOR + (month + DIFF_BETWEEN_JS_AND_HUMAN_MONTH) * ID_MONTH_FACTOR;
    for (const eventDate of allEvents.keys()) {
        if (dayId / ID_MONTH_FACTOR == Math.trunc(eventDate / ID_MONTH_FACTOR)) {
            allEventsInMonth.set(eventDate, allEvents.get(eventDate));
        }
    }
    return allEventsInMonth;
}

export const deleteEvent = (eventId) => {
    allEvents.get(eventId % ID_EVENT_FACTOR).splice(Math.trunc(eventId / ID_EVENT_FACTOR), 1);
}



