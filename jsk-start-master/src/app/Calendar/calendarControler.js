import * as model from "./calendarModel"
import * as view from "./calendarView"

let calendar = model.calendar;
let visibleMonth;
let visibleYear;

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

const initCalendar = () => {
    visibleMonth = new Date().getMonth();
    visibleYear = new Date().getFullYear();
    view.setCurrentYearAndMonth(visibleMonth, visibleYear);
    view.renderCalendar(calendar, visibleYear, visibleMonth);
}
initCalendar();

window.addEventListener('prevMonth-clicked', () => {
    decrementMonth();
    view.setCurrentYearAndMonth(visibleMonth, visibleYear);
    view.renderCalendar(calendar, visibleYear, visibleMonth);
});
window.addEventListener('nextMonth-clicked', () => {
    incrementMonth();
    view.setCurrentYearAndMonth(visibleMonth, visibleYear);
    view.renderCalendar(calendar, visibleYear, visibleMonth);
});
window.addEventListener('currMonth-clicked', () => {
    initCalendar();
});













