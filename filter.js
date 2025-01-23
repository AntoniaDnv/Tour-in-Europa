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

document.querySelectorAll(".card").forEach((card) => {
    const heartIcon = card.querySelector(".heart-icon");
    heartIcon.addEventListener("click", () => {
        console.log(heartIcon);
        
        heartIcon.classList.toggle("clicked");
    });

    const images = card.querySelectorAll(".carousel-image");
    const indicators = card.querySelectorAll(".indicator");
    let currentIndex = 0;

    function updateCarousel(index) {
        images.forEach((img, i) => img.classList.toggle("active", i === index));
        indicators.forEach((ind, i) => ind.classList.toggle("active", i === index));
    }

    card.querySelector(".left-arrow").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel(currentIndex);
    });

    card.querySelector(".right-arrow").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel(currentIndex);
    });

    indicators.forEach((ind, i) =>
        ind.addEventListener("click", () => {
            currentIndex = i;
            updateCarousel(currentIndex);
        })
    );
});

function filterEventsByDateRange(selectedDate) {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const startDate = card.getAttribute("data-start-date");
        const endDate = card.getAttribute("data-end-date");

        // Check if the selected date falls within the range
        if (isDateInRange(selectedDate, startDate, endDate)) {
            card.style.display = "flex"; // Show matching cards
        } else {
            card.style.display = "none"; // Hide non-matching cards
        }
    });
}

function isDateInRange(selectedDate, startDate, endDate) {
    const selected = new Date(selectedDate);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return selected >= start && selected <= end; // Check if the date is in range
}

function selectDate(day, month, year) {
    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    selectedDateInput.value = formattedDate; // Display selected date
    calendar.style.display = "none";
    filterEventsByDateRange(formattedDate); // Filter events by the selected date range
}



