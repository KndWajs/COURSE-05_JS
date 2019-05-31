let calendarDiv = document.getElementById("calendar");
let dayEventsDiv = document.getElementById("dayEvents");
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
    if (events.has(dayId)) {
        return "events: " + events.get(dayId).length;
    }
    return '';
}

// exports

export const renderCalendar = (calendar, year, month, events) => {
    calendarDiv.innerHTML = '';
    dayEventsDiv.style.visibility = 'hidden';

    createCalendarDays();

    let monthWeeks = calendar.monthDays(year, month);
    for (const week of monthWeeks) {
        const weekElement = document.createElement("div");
        weekElement.className = 'calendarWeek';
        for (const day of week) {
            let dayId = year * 10000 + (month + 1) * 100 + day;
            let numberOfEvents = getNumberOfEvents(events, dayId);
            const dayElement = document.createElement("div");
            dayElement.innerHTML = day > 0 ? `${day} <div class="eventsNumber"> ${numberOfEvents}</div>` : '';
            dayElement.className = 'calendarDay';
            dayElement.id = dayId;
            dayElement.onclick = dayClicked;
            if (year == new Date().getFullYear() && month == new Date().getMonth() && day == new Date().getDate()) {
                dayElement.className = dayElement.className + " currentPointed";
                pointedDay = dayElement;
            }
            weekElement.appendChild(dayElement);
        }
        calendarDiv.appendChild(weekElement);
    }
}

export const setCurrentYearAndMonth = (visibleYear, visibleMonth) => {
    document.getElementById("visibleMonth").innerText = (visibleMonth + 1) + ' / ' + visibleYear;
}

export const clearDayEventsDiv = () => {
    dayEventsDiv.innerHTML = ' ';
}

export const renderEvents = (events) => {
      
    for (const singleEvent of events) {

        let members ='';
        for (var i = 0; i < singleEvent.members.length; i++) {
            members += singleEvent.members[i] + "<br>";
          } 

        const singleEventRender = `
        Event ${singleEvent.id}<hr>
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


