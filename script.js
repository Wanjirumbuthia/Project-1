const BaseUrl = "https://www.hebcal.com";

const currentDate = document.querySelector(".current-date"),
    daysTag = document.querySelector(".days"),
    previousNextIcon = document.querySelectorAll(".icons span "),
    inputBtn = document.getElementById("inputBtn");

let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();

const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

const renderCalendar = () => {
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

const fetchData = async () => {
    try {
        const response = await fetch(`${BaseUrl}/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=${currentMonth + 1}&ss=on&mf=on&c=on&geo=geoname&geonameid=3448439&M=on&s=on`);
        const data = await response.json();
        renderCalendar(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();

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

inputBtn.addEventListener("click", async () => {
    const inputMonthValue = document.getElementById("inputMonth").value;
    const inputDayValue = document.getElementById("inputDay").value;

    const month = parseInt(inputMonthValue);
    const day = parseInt(inputDayValue);
    if (!isNaN(month) && !isNaN(day) && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        currentMonth = month - 1;
        currentYear = new Date().getFullYear();
        date = new Date(currentYear, currentMonth, day);
        await fetchData();
    } else {
        alert("Please enter a valid month (1-12) and day (1-31).");
    }
});

