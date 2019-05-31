let calendarDiv = document.getElementById("calendar");
const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const setCurrentYearAndMonth = (visibleMonth, visibleYear) => {
    document.getElementById("visibleMonth").innerText = (visibleMonth + 1) + ' / ' + visibleYear;
}

export const renderCalendar = (calendar, year, month) => {
    calendarDiv.innerHTML = '';

    let monthWeeks = calendar.monthDays(year, month);

    const weekElement = document.createElement("div");
    weekElement.className = 'calendarWeek';
    calendarDiv.appendChild(weekElement);
    for (const day of dayNames) {
        const dayElement = document.createElement("div");
        dayElement.innerText = day;
        dayElement.className = 'calendarDayHead';
        weekElement.appendChild(dayElement);
    }

    for (const week of monthWeeks) {
        const weekElement = document.createElement("div");
        weekElement.className = 'calendarWeek';
        for (const day of week) {
            const dayElement = document.createElement("div");
            dayElement.innerText = day > 0 ? day : '';
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

const dayClicked = (event) => {
    console.log('clicked on ' + event.currentTarget.innerText);
}

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


