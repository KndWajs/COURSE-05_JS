import * as model from "./calendarModel"
import * as view from "./calendarView"

let calendar = model.calendar;
let visibleMonth;
let visibleYear;
let events = new Map();

const decrementMonth = () => {
    (visibleMonth == 0 ? visibleMonth = 11 : visibleMonth = visibleMonth - 1)
    if (visibleMonth === 11) {
        visibleYear = visibleYear - 1;
    }
}
const incrementMonth = () => {
    (visibleMonth == 11 ? visibleMonth = 0 : visibleMonth = visibleMonth + 1)
    if (visibleMonth === 0) {
        visibleYear = visibleYear + 1;
    }
}

const updateView = (visibleYear, visibleMonth) => {
    events = model.getEvents(visibleYear, visibleMonth);
    view.setCurrentYearAndMonth(visibleYear, visibleMonth);
    view.renderCalendar(calendar, visibleYear, visibleMonth, events);
}

const renderApproachEvents = () => {
    const todayEvents = events.get(visibleYear * 10000 + (visibleMonth + 1) * 100 + new Date().getDate());
    const tomorrowEvents = events.get(visibleYear * 10000 + (visibleMonth + 1) * 100 + new Date().getDate() +1);
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
    view.clearDayEventsDiv();
    if (events.has(parseInt(event.detail.dayNumber))) {
        view.renderEvents(events.get(parseInt(event.detail.dayNumber)));
    }
});











