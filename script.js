const BaseUrl = "https://www.hebcal.com";

const currentDate = document.querySelector(".current-date"),
    daysTag = document.querySelector(".days"),
    previousNextIcon = document.querySelectorAll(".icons span ");

let date = new Date(),
    currentYear = date.getFullYear(),
    currentMonth = date.getMonth();

const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

const renderCalendar = (monthData) => {
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

const fetchData = (userInput) => {
    fetch(`${BaseUrl}${userInput}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Log the data to the console
            renderCalendar(data); // Call the renderCalendar function with the fetched data
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

fetchData(`?month=${currentMonth + 1}`); // Fetch data for the current month

previousNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        const userInput = icon.id === "prev" ? `?month=${currentMonth}` : `?month=${currentMonth + 2}`; // Adjust the month input based on the icon clicked
        fetchData(userInput); // Call fetchData with the user input
    })
})
