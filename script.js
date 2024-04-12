// Base URL for API requests
const BaseUrl = "https://www.hebcal.com";
// Selecting DOM elements
const currentDate = document.querySelector(".current-date"),
    daysTag = document.querySelector(".days"),
    previousNextIcon = document.querySelectorAll(".icons span "),
    inputBtn = document.getElementById("inputBtn");

let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();
// Array of month names in Hebrew sarting from January to December
const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

const renderCalendar = () => {
     // Get the first day of the current month, the last date of the current month, 
    // the last day of the current month, and the last date of the previous month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayOfMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        const isToday = i === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" data-date="${currentYear}-${currentMonth + 1}-${i}" onclick="handleDateClick(this)">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
}

// Function to fetch data from the API
const fetchData = async () => {
    try {
        // Make a GET request to the API endpoint for the current month
        const response = await fetch(`${BaseUrl}/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=${currentMonth + 1}&ss=on&mf=on&c=on&geo=geoname&geonameid=3448439&M=on&s=on`);
        const data = await response.json();
        renderCalendar(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();
// Event listeners for previous and next month navigation
previousNextIcon.forEach(icon => {
    icon.addEventListener("click", async () => {
        currentMonth = icon.id === "prev" ? currentMonth - 1 : currentMonth + 1;

        if (currentMonth < 0 || currentMonth > 11) {
            date = new Date(currentYear, currentMonth);
            currentYear = date.getFullYear();
            currentMonth = date.getMonth();
        } else {
            date = new Date;
        }

        await fetchData();
    })
});
// Event listener for the click event on the input button
inputBtn.addEventListener("click", async () => {
    const inputMonthValue = document.getElementById("inputMonth").value;
    const inputDayValue = document.getElementById("inputDay").value;

    const month = parseInt(inputMonthValue);
    const day = parseInt(inputDayValue);
    if (!isNaN(month) && !isNaN(day) && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        currentMonth = month - 1;
        currentYear = new Date().getFullYear();
        date = new Date(currentYear, currentMonth, day);
         // Fetch data for the specified date
        await fetchData();
    } else {
        // If the input values are not valid, display an alert message
        alert("Please enter a valid month (1-12) and day (1-31).");
    }
});

