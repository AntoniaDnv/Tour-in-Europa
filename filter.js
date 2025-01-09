const calendar = document.getElementById("calendar");
const calendarBody = document.getElementById("calendarBody");
const monthYear = document.getElementById("monthYear");
const selectedDateInput = document.getElementById("selectedDate");

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function toggleCalendar() {
    calendar.style.display = calendar.style.display === "none" ? "block" : "none";
    if (calendar.style.display === "block") {
        renderCalendar(currentMonth, currentYear);
        adjustCalendarPosition();
    }
}

function renderCalendar(month, year) {
    calendarBody.innerHTML = ""; 
    monthYear.textContent = `${new Date(year, month).toLocaleString("default", { month: "long" })} ${year}`;
    
    
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    daysOfWeek.forEach(day => {
        const dayElem = document.createElement("div");
        dayElem.textContent = day;
        dayElem.style.fontWeight = "bold";
        calendarBody.appendChild(dayElem);
    });

    
    const firstDay = new Date(year, month, 1).getDay() || 7; 

    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendarBody.appendChild(emptyCell);
    }
    
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.textContent = day;
        dayCell.className = "day";
        dayCell.onclick = () => selectDate(day, month, year);
        calendarBody.appendChild(dayCell);
    }
}

function selectDate(day, month, year) {
    selectedDateInput.value = `${day}/${month + 1}/${year}`;
    calendar.style.display = "none"; 
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}


document.addEventListener("click", (event) => {
    if (!calendar.contains(event.target) && event.target !== selectedDateInput) {
        calendar.style.display = "none";
    }
});

document.addEventListener("click", (event) => {
    if (!calendar.contains(event.target) && event.target !== selectedDateInput) {
        calendar.style.display = "none";
    }
});



