let startTime;
let elapsedTime = 0;
let interval;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lap-list");
const spinAnimation = document.getElementById("spin-animation");

function timeToObj(time) {
  const diffInHrs = Math.floor(time / 3600000);
  const diffInMins = Math.floor((time % 3600000) / 60000);
  const diffInSecs = Math.floor((time % 60000) / 1000);
  const diffInMs = time % 1000;

  const hrs = diffInHrs.toString().padStart(2, "0");
  const mins = diffInMins.toString().padStart(2, "0");
  const secs = diffInSecs.toString().padStart(2, "0");
  const ms = diffInMs.toString().padStart(3, "0");

  return { hrs, mins, secs, ms };
}

function start() {
  startTime = Date.now() - elapsedTime;
  interval = setInterval(function () {
    elapsedTime = Date.now() - startTime;
    print(timeToObj(elapsedTime));
    spinAnimation.style.animationPlayState = "running";
  }, 10);
}

function stop() {
  clearInterval(interval);
  spinAnimation.style.animationPlayState = "paused";
}

function reset() {
  clearInterval(interval);
  print({
    hrs: "00",
    mins: "00",
    secs: "00",
    ms: "000",
  });
  elapsedTime = 0;

  spinAnimation.style.animation = "none"; // Stop the animation immediately
  setTimeout(() => {
    spinAnimation.style.animation = ""; // Reapply the animation
  }, 0);

  spinAnimation.style.animationPlayState = "paused";
  lapList.innerHTML = "";
}

function print(time) {
  display.innerHTML = `<span>${time.hrs}:${time.mins}:${time.secs}</span> <span class="miliseconds">${time.ms}</span>`;
}

function displayLapTimes() {
  const time = timeToObj(elapsedTime);
  const lapTime = `<li>${time.hrs}:${time.mins}:${time.secs}:${time.ms}</li>`;
  lapList.insertAdjacentHTML("afterbegin", lapTime);
}

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", displayLapTimes);
