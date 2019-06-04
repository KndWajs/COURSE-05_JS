import { Calendar } from "calendar"
import * as data from "./data"
import * as calendarConst from "./calendarConst"

const FIRST_DAY = 1;

if (localStorage == null) {
    data.initDataBase();
}

export const calendar = new Calendar(FIRST_DAY);

const validateYear = (year) => {
    if (year < 1900 || year > 2100) {
        throw new Error('InvalidYearNo');
    }
}
const validateMonth = (month) => {
    if (month < 1 || month > 12) {
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
    let monthId = year * calendarConst.ID_YEAR_FACTOR + (month) * calendarConst.ID_MONTH_FACTOR;
    for (var i = 0; i < localStorage.length; i++) {
        if (monthId / calendarConst.ID_MONTH_FACTOR == Math.trunc(localStorage.key(i) / calendarConst.ID_MONTH_FACTOR)) {
            allEventsInMonth.set(parseInt(localStorage.key(i)), JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }
    return allEventsInMonth;
}

export const deleteEvent = (dayId, eventIndex) => {
    if (localStorage.getItem(dayId) == null || JSON.parse(localStorage.getItem(dayId)).length <= eventIndex) {
        throw new Error('ThereIsNoEventWithSpecifiedId');
    }
    let items = JSON.parse(localStorage.getItem(dayId));
    items.splice(eventIndex, 1);
    localStorage.setItem(dayId, JSON.stringify(items));
}

export const addEvent = (dayId, event) => {
    validateYear(Math.trunc(dayId / calendarConst.ID_YEAR_FACTOR));
    validateMonth(Math.trunc(dayId / calendarConst.ID_MONTH_FACTOR) % calendarConst.ID_MONTH_FACTOR);
    validateDay(dayId % calendarConst.ID_MONTH_FACTOR);

    if (event.title == null || event.title == '') {
        throw new Error('TitleFieldIsEmpty');
    }
    if (event.place == null || event.place == '') {
        throw new Error('PlaceFieldIsEmpty');
    }

    let dayEvents = [];
    if (localStorage.getItem(dayId) != null ) {
        dayEvents = JSON.parse(localStorage.getItem(dayId));
    }
    dayEvents.push(event);
    localStorage.setItem(dayId, JSON.stringify(dayEvents));
}



