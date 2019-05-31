let calendarDiv = document.getElementById("calendar");
const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const dayClicked = (event) => {
    console.log('clicked on ' + event.currentTarget.innerText);
}

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


// exports

export const renderCalendar = (calendar, year, month, events) => {
    calendarDiv.innerHTML = '';

    createCalendarDays();

    let monthWeeks = calendar.monthDays(year, month);
    for (const week of monthWeeks) {
        const weekElement = document.createElement("div");
        weekElement.className = 'calendarWeek';
        for (const day of week) {
            let dayId = year * 10000 + (month + 1) * 100 + day;
            // console.log(dayId);
            let numberOfEvents = '';
            if (events.has(dayId)) {
                console.log(events.get(dayId).length);
                numberOfEvents = "events: " + events.get(dayId).length;
                console.log(events.get(dayId));
            }
            const dayElement = document.createElement("div");
            dayElement.innerHTML = day > 0 ? `${day} <div class="eventsNumber"> ${numberOfEvents}</div>` : '';
            dayElement.className = 'calendarDay';
            dayElement.onclick = dayClicked;
            if (year == new Date().getFullYear() && month == new Date().getMonth() && day == new Date().getDate()) {
                dayElement.id = 'currentDay';
            }
            weekElement.appendChild(dayElement);
        }
        calendarDiv.appendChild(weekElement);
    }
}

export const setCurrentYearAndMonth = (visibleYear, visibleMonth) => {
    document.getElementById("visibleMonth").innerText = (visibleMonth + 1) + ' / ' + visibleYear;
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


