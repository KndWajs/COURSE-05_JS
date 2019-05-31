const calendarDiv = document.getElementById("calendar");
const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];



export const setCurrentYearAndMonth = (visibleMonth, visibleYear) => {
    document.getElementById("visibleMonth").innerText = (visibleMonth + 1) + ' / ' + visibleYear;
}

export const renderCalendar = (monthWeeks, month) => {

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
            if (month == new Date().getMonth() && day == new Date().getDate()) {
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

export const changeMonth = () => {
    const prevMonthButton = document.getElementById("prevMonth"),
      nextMonthButton = document.getElementById("nextMonth");
    prevMonthButton.addEventListener('click', () => {
        console.log('sad');
        return -1;
    })
    nextMonthButton.addEventListener('click', () => {
       console.log('sad2');
        return 1;
    })
}



