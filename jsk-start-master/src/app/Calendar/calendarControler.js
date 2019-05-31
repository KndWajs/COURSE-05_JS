import * as model from "./calendarModel"
import * as view from "./calendarView"

export const visibleMonth = new Date().getMonth();
export const visibleYear = new Date().getFullYear();

const currentMonthWeeks = model.calendar.monthDays(visibleYear, visibleMonth);

view.setCurrentYearAndMonth(visibleMonth, visibleYear);

view.renderCalendar(currentMonthWeeks, visibleMonth);

const setHeader = () => {
//    visibleMonth = visibleMonth + 1;
   console.log('sadvar');
}
console.log(view.changeMonth());
    








