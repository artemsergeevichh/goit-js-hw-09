import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const text = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const showSeconds = document.querySelector('span[data-seconds]');
const showMinutes = document.querySelector('span[data-minutes]');
const showHours = document.querySelector('span[data-hours]');
const showDays = document.querySelector('span[data-days]');


btnStart.disabled = true;

let deadline = null;

flatpickr(text, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    deadline = selectedDates[0]
    if (selectedDates[0] <= Date.now()) {
      btnStart.disabled = true
      window.alert("Please choose a date in the future")
    } else {
      btnStart.disabled = false;
    };
  },
})



  function convertMs(ms) {
   
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    
    const days = addLeadingZero(Math.floor(ms / day));
    
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }



  function addLeadingZero(value){
    return value.toString().padStart(2, '0'); 
  }
  


  const timer = {
    start() {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = deadline - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        showDays.textContent = days;
        showHours.textContent = hours;
        showMinutes.textContent = minutes;
        showSeconds.textContent = seconds;
  
        if (deltaTime <= 500) {
          window.alert("Krasava");
          clearInterval(interval);
        }
      }, 1000);
    },
  };
  


  btnStart.addEventListener('click', () => {
    timer.start();
  });