import * as calendarConst from "./calendarConst"

const calendarDiv = document.getElementById("calendar");
const dayEventsDiv = document.getElementById("dayEvents");
const todayEventsDiv = document.getElementById("todayEvents");
const tomorrowEventsDiv = document.getElementById("tomorrowEvents");

let pointedDay;
const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const createCalendarDayNames = () => {
    const weekElement = document.createElement("div");
    weekElement.className = 'calendarWeek';
    calendarDiv.appendChild(weekElement);
    for (const day of dayNames) {
        const dayElement = document.createElement("div");
        dayElement.innerText = day;
        dayElement.className = 'calendarDayHead';
        weekElement.appendChild(dayElement);
    }
}

const getNumberOfEvents = (events, dayId) => {
    if (events.has(dayId) && events.get(dayId).length != 0) {
        return "events: " + events.get(dayId).length;
    }
    return '';
}

const renderSimplifiedEventView = (title, events, divDestination) => {
    if (events == null || events.length == 0) {
        const eventRender = `<div><b>${title}</b><hr>Nothing to do!<br></div>`;
        divDestination.insertAdjacentHTML('beforeend', eventRender);
    } else {
        const eventTitle = `<div><b>${title}</b></div><hr>`;
        divDestination.insertAdjacentHTML('beforeend', eventTitle);

        for (var i = 0; i < events.length; i++) {
            const event = events[i];
            const eventRender = `   
            <div>
            <b>${i + 1}</b><br><br>
            <b>Title:</b> ${event.title}<br><br>
            <b>Place:</b> ${event.place}<br><br><br> 
            </div>
        `;
            divDestination.insertAdjacentHTML('beforeend', eventRender);
        }
    }
}

const pointCurrentDay = (preparedDayId) => {
    const currentDay = document.getElementById(preparedDayId + new Date().getDate());
    currentDay.style.borderColor = 'black';
    pointedDay = currentDay;
}

// exports

export const renderApproachEvents = (todayEvents, tomorrowEvents) => {
    todayEventsDiv.innerHTML = ' ';
    tomorrowEventsDiv.innerHTML = ' ';

    const todayTitle = 'Today events';
    renderSimplifiedEventView(todayTitle, todayEvents, todayEventsDiv);

    const tomorrowTitle = 'Tomorrow events';
    renderSimplifiedEventView(tomorrowTitle, tomorrowEvents, tomorrowEventsDiv);
}

export const renderCalendar = (calendar, year, month, events) => {
    calendarDiv.innerHTML = '';
    createCalendarDayNames();
    const preparedDayId = year * calendarConst.ID_YEAR_FACTOR + month * calendarConst.ID_MONTH_FACTOR;
    let monthWeeks = calendar.monthDays(year, month - calendarConst.DIFF_BETWEEN_JS_AND_HUMAN_MONTH);
    for (const week of monthWeeks) {
        const weekElement = document.createElement("div");
        weekElement.className = 'calendarWeek';
        for (const day of week) {
            const dayElement = document.createElement("div");
            dayElement.className = 'calendarDay';
            if (day > 0) {
                let dayId = preparedDayId + day;
                let numberOfEvents = getNumberOfEvents(events, dayId);
                dayElement.innerHTML = day > 0 ? `${day} <div class="eventsNumber"> ${numberOfEvents}</div>` : '';
                dayElement.id = dayId;
                dayElement.onclick = dayClicked;
            }
            weekElement.appendChild(dayElement);
        }
        calendarDiv.appendChild(weekElement);
    }
    
    if (year == new Date().getFullYear() && month == new Date().getMonth() + calendarConst.DIFF_BETWEEN_JS_AND_HUMAN_MONTH) {
       pointCurrentDay(preparedDayId);
    }
}

export const setCurrentYearAndMonth = (visibleYear, visibleMonth) => {
    document.getElementById("visibleMonth").innerText = visibleMonth + ' / ' + visibleYear;
}

export const clearDayEventsDiv = () => {
    dayEventsDiv.innerHTML = ' ';
}

export const renderEvents = (events, dayId) => {
    for (var eventIndex = 0; eventIndex < events.length; eventIndex++) {
        const singleEvent = events[eventIndex];
        let members = '';
        for (var j = 0; j < singleEvent.members.length; j++) {
            members += singleEvent.members[j] + "<br>";
        }
        const singleEventRender = `
        Event ${eventIndex + 1} <button id="${dayId}-${eventIndex}">X</button><hr>
        <div class = "singleEvent">
        <div>
        <b>Title:</b> ${singleEvent.title}<br>
        <b>Place:</b> ${singleEvent.place}<br>
        <b>Description:</b> ${singleEvent.description}<br>
        </div>
        <div class = "singleEventMembers">
        <b>MEMBERS</b><br> 
        ${members}
        </div>
        </div>
    `;
        dayEventsDiv.insertAdjacentHTML('beforeend', singleEventRender);
        document.getElementById(`${dayId}-${eventIndex}`).onclick = deleteClicked;
    }
}

// listners

const changeMonth = () => {
    const prevMonthButton = document.getElementById("prevMonthBtn"),
        nextMonthButton = document.getElementById("nextMonthBtn"),
        currMonthButton = document.getElementById("currMonthBtn");

    prevMonthButton.addEventListener('click', () => {
        dayEventsDiv.style.visibility = 'hidden';
        dispatchEvent(new CustomEvent('prevMonthBtn-clicked', {
            bubbles: true,
        }));
    })
    nextMonthButton.addEventListener('click', () => {
        dayEventsDiv.style.visibility = 'hidden';
        dispatchEvent(new CustomEvent('nextMonthBtn-clicked', {
            bubbles: true,
        }));
    })
    currMonthButton.addEventListener('click', () => {
        dayEventsDiv.style.visibility = 'hidden';
        dispatchEvent(new CustomEvent('currMonthBtn-clicked', {
            bubbles: true,
        }));
    })
}
changeMonth();

const addEvent = () => {
    const addEventDiv = document.getElementById("addEvent");
    document.getElementById(`addEventBtn`).onclick = () => {
        addEventDiv.style.visibility = 'visible';
        const defaultData = pointedDay.id.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
        document.getElementById("eventDate").value = defaultData;
    };

    const addEventForm = document.getElementById("addEventForm");
    addEventForm.onreset = () => {
        addEventDiv.style.visibility = 'hidden';
    };

    addEventForm.onsubmit = (event) => {
        event.preventDefault();
        dispatchEvent(new CustomEvent('addEvent-submit', {
            detail: {
                title: document.getElementById("eventTitle").value,
                date: document.getElementById("eventDate").value,
                place: document.getElementById("eventPlace").value,
                description: document.getElementById("eventDescription").value,
                members: document.getElementById("eventMembers").value
            },
            bubbles: true,
        }));
        addEventDiv.style.visibility = 'hidden';
    };
}
addEvent();

const deleteClicked = (event) => {
    const id = event.currentTarget.id.split("-");
    dispatchEvent(new CustomEvent('specificDayDelete-clicked', {
        detail: {
            dayId: parseInt(id[0]),
            eventIndex: parseInt(id[1])
        },
    }));
}

const dayClicked = (event) => {
    const dayId = parseInt(event.currentTarget.id);
    pointedDay.className = "calendarDay";
    pointedDay = document.getElementById(dayId);
    pointedDay.className = pointedDay.className + " currentPointed";
    dayEventsDiv.style.visibility = 'visible';

    dispatchEvent(new CustomEvent('specificDay-clicked', {
        detail: { dayNumber: dayId },
    }));
}
