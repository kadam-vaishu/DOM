let timeElement = document.getElementById("time");
let dateElement = document.getElementById("date");
let toggleBtn = document.getElementById("toggle-btn");

let is24Hour = true;

function updateTime() {

    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    let period = "";

    if (!is24Hour) {

        period = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;

        if (hours === 0) {
            hours = 12;
        }

        timeElement.textContent =
            String(hours).padStart(2, "0") +
            ":" +
            minutes +
            ":" +
            seconds +
            " " +
            period;

    } else {

        timeElement.textContent =
            String(hours).padStart(2, "0") +
            ":" +
            minutes +
            ":" +
            seconds;
    }

    let day = String(now.getDate()).padStart(2, "0");
    let month = String(now.getMonth() + 1).padStart(2, "0");
    let year = now.getFullYear();

    dateElement.textContent = day + "/" + month + "/" + year;
}

toggleBtn.addEventListener("click", function () {

    is24Hour = !is24Hour;

    updateTime();
});

updateTime();

setInterval(updateTime, 1000);