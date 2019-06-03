import * as model from "./calendarModel"
import * as view from "./calendarView"

const DIFF_BETWEEN_JS_AND_HUMAN_MONTH = 1;
const LAST_MONTH_NUMBER = 11;
const FIRST_MONTH_NUMBER = 1;
const ID_YEAR_FACTOR = 1e4;
const ID_MONTH_FACTOR = 1e2;


let calendar = model.calendar;
let visibleMonth;
let visibleYear;
let events = new Map();

const decrementMonth = () => {
    (visibleMonth == FIRST_MONTH_NUMBER ? visibleMonth = LAST_MONTH_NUMBER : visibleMonth = visibleMonth - 1)
    if (visibleMonth === LAST_MONTH_NUMBER) {
        visibleYear = visibleYear - 1;
    }
}
const incrementMonth = () => {
    (visibleMonth == LAST_MONTH_NUMBER ? visibleMonth = FIRST_MONTH_NUMBER : visibleMonth = visibleMonth + 1)
    if (visibleMonth === FIRST_MONTH_NUMBER) {
        visibleYear = visibleYear + 1;
    }
}

const updateView = (visibleYear, visibleMonth) => {
    events = model.getEvents(visibleYear, visibleMonth);
    view.setCurrentYearAndMonth(visibleYear, visibleMonth);
    view.renderCalendar(calendar, visibleYear, visibleMonth, events);
}

const renderApproachEvents = () => {
    const dayId = visibleYear * ID_YEAR_FACTOR + (visibleMonth + DIFF_BETWEEN_JS_AND_HUMAN_MONTH) * ID_MONTH_FACTOR + new Date().getDate();
    const todayEvents = events.get(dayId);
    const tomorrowEvents = events.get(dayId + 1);
    view.renderApproachEvents(todayEvents, tomorrowEvents);
}

const initCalendar = () => {
    visibleMonth = new Date().getMonth();
    visibleYear = new Date().getFullYear();
    updateView(visibleYear, visibleMonth);
    view.clearApproachEventsDiv();
    renderApproachEvents();
}
initCalendar();

const renderSpecificDayEvents = (dayId) => {
    view.clearDayEventsDiv();    
    if (events.has(dayId) && events.get(dayId).size != 0) {
        view.renderEvents(events.get(dayId), dayId);
    }

}

// listners

window.addEventListener('prevMonth-clicked', () => {
    decrementMonth();
    updateView(visibleYear, visibleMonth);
});
window.addEventListener('nextMonth-clicked', () => {
    incrementMonth();
    updateView(visibleYear, visibleMonth);
});
window.addEventListener('currMonth-clicked', () => {
    initCalendar();
});
window.addEventListener('specificDay-clicked', (event) => {
    const dayId = parseInt(event.detail.dayNumber);
    renderSpecificDayEvents(dayId);
});

window.addEventListener('specificDayDelete-clicked', (event) => {
    model.deleteEvent(event.detail.eventId);
    updateView(visibleYear, visibleMonth);
    renderSpecificDayEvents(event.detail.eventId%1e8);
    view.clearApproachEventsDiv();
    renderApproachEvents();
});

window.addEventListener('addEvent-submit', (event) => {
    const dayId = parseInt(event.detail.date.replace(/-/g, ''));
    const newEvent = {
        title: event.detail.title,
        place: event.detail.place,
        description: event.detail.description,
        members: [event.detail.members],
    }
    model.addEvent(dayId, newEvent);
    updateView(visibleYear, visibleMonth);
    view.clearApproachEventsDiv();
    renderApproachEvents();
});
