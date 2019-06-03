const DIFF_BETWEEN_JS_AND_HUMAN_MONTH = 1;
const calendarDiv = document.getElementById("calendar");
const dayEventsDiv = document.getElementById("dayEvents");
const todayEventsDiv = document.getElementById("todayEvents");
const tomorrowEventsDiv = document.getElementById("tomorrowEvents");

let pointedDay;
const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const createCalendarDays = () => {
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

// exports

export const clearApproachEventsDiv = () => {
    todayEventsDiv.innerHTML = ' ';
    tomorrowEventsDiv.innerHTML = ' ';
}

export const renderApproachEvents = (todayEvents, tomorrowEvents) => {
    const todayTitle = 'Today events';
    renderSimplifiedEventView(todayTitle, todayEvents, todayEventsDiv);
    const tomorrowTitle = 'Tomorrow events';
    renderSimplifiedEventView(tomorrowTitle, tomorrowEvents, tomorrowEventsDiv);
}

export const renderCalendar = (calendar, year, month, events) => {
    calendarDiv.innerHTML = '';
    dayEventsDiv.style.visibility = 'hidden';

    createCalendarDays();

    let monthWeeks = calendar.monthDays(year, month);
    for (const week of monthWeeks) {
        const weekElement = document.createElement("div");
        weekElement.className = 'calendarWeek';
        for (const day of week) {
            let dayId = year * 10000 + (month + DIFF_BETWEEN_JS_AND_HUMAN_MONTH) * 100 + day;
            let numberOfEvents = getNumberOfEvents(events, dayId);
            const dayElement = document.createElement("div");
            dayElement.innerHTML = day > 0 ? `${day} <div class="eventsNumber"> ${numberOfEvents}</div>` : '';
            dayElement.className = 'calendarDay';
            dayElement.id = dayId;
            dayElement.onclick = dayClicked;
            if (year == new Date().getFullYear() && month == new Date().getMonth() && day == new Date().getDate()) {
                pointedDay = dayElement;
                dayElement.style.borderColor = 'black';
            }
            weekElement.appendChild(dayElement);
        }
        calendarDiv.appendChild(weekElement);
    }
}

export const setCurrentYearAndMonth = (visibleYear, visibleMonth) => {
    document.getElementById("visibleMonth").innerText = (visibleMonth + DIFF_BETWEEN_JS_AND_HUMAN_MONTH) + ' / ' + visibleYear;
}

export const clearDayEventsDiv = () => {
    dayEventsDiv.innerHTML = ' ';
}

export const renderEvents = (events, dayId) => {
    for (var i = 0; i < events.length; i++) {
        const singleEvent = events[i];
        let members = '';
        for (var j = 0; j < singleEvent.members.length; j++) {
            members += singleEvent.members[j] + "<br>";
        }
        const singleEventRender = `
        Event ${i + 1} <button id="${i}${dayId}">X</button><hr>
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
        document.getElementById(`${i}${dayId}`).onclick = deleteClicked;
    }
}

// listners

const changeMonth = () => {
    const prevMonthButton = document.getElementById("prevMonth"),
        nextMonthButton = document.getElementById("nextMonth"),
        currMonthButton = document.getElementById("currMonth");

    prevMonthButton.addEventListener('click', () => {
        dispatchEvent(new CustomEvent('prevMonth-clicked', {
            bubbles: true,
            composed: true,
        }));
    })
    nextMonthButton.addEventListener('click', () => {
        dispatchEvent(new CustomEvent('nextMonth-clicked', {
            bubbles: true,
            composed: true,
        }));
    })
    currMonthButton.addEventListener('click', () => {
        dispatchEvent(new CustomEvent('currMonth-clicked', {
            bubbles: true,
            composed: true,
        }));
    })
}
changeMonth();

const addEventSubmit = () => {
    const addEventDiv = document.getElementById("addEvent");
    document.getElementById(`addEventBtn`).onclick = () => {
        addEventDiv.style.visibility = 'visible';
        const defaultData = pointedDay.id.toString().replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
        console.log(defaultData);
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
            composed: true,
        }));
        addEventDiv.style.visibility = 'hidden';
    };
}
addEventSubmit();

const deleteClicked = (event) => {
    dispatchEvent(new CustomEvent('specificDayDelete-clicked', {
        detail: { eventId: event.currentTarget.id },
    }));
}

const dayClicked = (event) => {
    if (parseInt(event.currentTarget.id) % 100 == 0) {
        return;
    }
    pointedDay.className = "calendarDay";
    pointedDay = document.getElementById(parseInt(event.currentTarget.id));
    pointedDay.className = pointedDay.className + " currentPointed";
    dayEventsDiv.style.visibility = 'visible';

    dispatchEvent(new CustomEvent('specificDay-clicked', {
        detail: { dayNumber: event.currentTarget.id },
    }));
}
