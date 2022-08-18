
var Clock = {
  totalSeconds: 10,
  startTimer: function () {
    if (!this.interval) {
        var self = this;
        function pad(val) { 
          return val > 9 ? val : "0" + val;
      }

        this.interval = setInterval(function () {
          self.totalSeconds -= 1;
          document.getElementById("minutes").innerHTML = pad(Math.floor(self.totalSeconds / 60 % 60));
          document.getElementById("seconds").innerHTML = pad(parseInt(self.totalSeconds % 60));
        }, 1000);
    }
  },

  resetTimer: function () {
    Clock.totalSeconds = 1500; 
    clearInterval(this.interval);
    document.getElementById("minutes").innerHTML = "25";
    document.getElementById("seconds").innerHTML = "00";
    delete this.interval;
  },
  pauseTimer: function () {
    clearInterval(this.interval);
    delete this.interval;
  },
  resumeTimer: function () {
    this.startTimer();
  },
};


document.getElementById("start").addEventListener("click", function () { Clock.startTimer(); });
document.getElementById("pause").addEventListener("click", function () { Clock.pauseTimer(); });
document.getElementById("reset").addEventListener("click", function () { Clock.resetTimer(); });