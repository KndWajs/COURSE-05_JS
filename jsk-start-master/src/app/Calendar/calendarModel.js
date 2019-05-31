import { Calendar } from "calendar"
import * as data from "./data"

const FIRST_DAY = 1;

let allEvents = data.sampleDataMap;

export const calendar = new Calendar(FIRST_DAY);

export const getEvents = (year, month) => {
    let allEventsInMonth = new Map();
    let yearMonthId = year * 100 + (month + 1);
    for (const eventDate of allEvents.keys()) {
        if (yearMonthId == Math.trunc(eventDate / 100)) {
            allEventsInMonth.set(eventDate, allEvents.get(eventDate));
        }
    }
    return allEventsInMonth;
}



