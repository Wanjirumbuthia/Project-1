const BaseUrl = "https://www.hebcal.com";

const currentDate = document.querySelector(".current-date"),
    daysTag = document.querySelector(".days"),
    previousNextIcon = document.querySelectorAll(".icons span ");

let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();

const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

const renderCalender = (monthData) => {
    const firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay(),
        lastDateofMonth = new Date(currentYear, currentMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currentYear, currentMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive"> ${lastDateofLastMonth - i + 1} </li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive"> ${i - lastDayofMonth + 1} </li>`;
    }

    currentDate.innerText = `${months[currentMonth]} ${currentYear}`;
    daysTag.innerHTML = liTag;
}

const fetchData = async () => {
    try {
        const response = await fetch(`${BaseUrl}/hebcal?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=${currentMonth + 1}&ss=on&mf=on&c=on&geo=geoname&geonameid=3448439&M=on&s=on`);
        const data = await response.json();
        renderCalender(data);
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
})
