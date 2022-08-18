function paddedFormat(num) {
  return num < 10 ? "0" + num : num; 
}

function startCountDown(duration, element) {

  let secondsRemaining = duration;
  let min = 0;
  let sec = 0;

  let countInterval = setInterval(function () {

      min = parseInt(secondsRemaining / 60);
      sec = parseInt(secondsRemaining % 60);

      element.textContent = `${paddedFormat(min)}:${paddedFormat(sec)}`;

      secondsRemaining = secondsRemaining - 1;
      if (secondsRemaining < 0) { clearInterval(countInterval) };

  }, 1000);
}

var startClock = function () {
  let time_minutes = 25; // Value in minutes
  let time_seconds = 00; // Value in seconds

  let duration = time_minutes * 60 + time_seconds;

  element = document.querySelector('.frontWhiteCircle');
  element.textContent = `${paddedFormat(time_minutes)}:${paddedFormat(time_seconds)}`;

  startCountDown(--duration, element);
}

document.getElementById("start").addEventListener("click", startClock);

