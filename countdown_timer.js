const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const d = document.querySelector("[data-days]");
const h = document.querySelector("[data-hours]");
const m = document.querySelector("[data-minutes]");
const s = document.querySelector("[data-seconds]");

let selectedDate = null;
let intervalId = null;

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  onClose(dates) {
    selectedDate = dates[0];
    startBtn.disabled = selectedDate <= new Date();
  }
});

startBtn.addEventListener("click", () => {
  intervalId = setInterval(() => {
    const diff = selectedDate - new Date();

    if (diff <= 0) {
      clearInterval(intervalId);
      return;
    }

    const time = convertMs(diff);
    d.textContent = pad(time.days);
    h.textContent = pad(time.hours);
    m.textContent = pad(time.minutes);
    s.textContent = pad(time.seconds);
  }, 1000);

  startBtn.disabled = true;
  input.disabled = true;
});


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor((ms % day % hour) / minute),
    seconds: Math.floor((ms % day % hour % minute) / second)
  };
}

function pad(v) {
  return String(v).padStart(2, "0");
}
