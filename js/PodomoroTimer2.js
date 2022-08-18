
      
const startTime = new Date().getTime();
const workSeconds = 20;
const breakSeconds = 300;

  var WorkTimer = function (startTime) {
    var currentTime = new Date().getTime();

    var diffSec = Math.round((currentTime - startTime) / 1000);

    var workRemainingTime = workSeconds - diffSec + 1;

    document.getElementById("pause").onclick = function () {
      clearInterval(WtimerId);
      clearInterval(BtimerId);
    };

    /* document.getElementById("start").onclick = function () {
      setInterval(WtimerId);
    }; */

    workTimeUpdate(workRemainingTime);

    var BreakTimer = function (startTime) {
      var currentTime = new Date().getTime();
  
      var diffSec = Math.round((currentTime - startTime) / 1000);
  
      var breakRemainingTime =
        breakSeconds - diffSec + parseInt(`${workSeconds}`) + 1;
  
      breakTimeUpdate(breakRemainingTime);
  
      if (breakRemainingTime == 0) {
        clearInterval(BtimerId);
      }
    };
  

    if (workRemainingTime == 0) {
      clearInterval(WtimerId);
      var BtimerId = setInterval(function () {
        BreakTimer(startTime);
      }, 1000 )
    }
  
  };




  // start the timer.
  var WtimerId = setInterval(function () {
    WorkTimer(startTime);
  }, 1000);



// update progess with the timer.
function workTimeUpdate(seconds) {
  //barRenderer(seconds);
textRenderer(seconds);
}

function breakTimeUpdate(seconds) {
  //barRenderer(seconds);
  textRenderer(seconds);
}

/* // refresh the bar.
function barRenderer (seconds) {
  var percent = (seconds / workSeconds) * 100;
  $(".bar").css("width", percent + "%");
} */

// refresh the text of the bar.
function textRenderer(seconds) {
  var sec = seconds % 60;
  var min = Math.floor(seconds / 60);

  /* 兩種作法都可以 */
  min = min.toString().padStart(2, "0");
  sec = sec.toString().padStart(2, "0");

  const text = document.querySelector(".timer");
  text.innerHTML = `
  <div class="TimeText">${min + ":" + sec}</div>
  `;
}
