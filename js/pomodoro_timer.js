(function(){
  ClockEvent();
})();




function ClockEvent(){
  WorkClock();


  function WorkClock(){
      let startingMinutes = document.getElementById('setWorkTime').value;
      let time = startingMinutes * 60 ;
      let timeLeft = 0;
      let minutes;
      let seconds;

    // setup 
    var data = {
      // labels: ['Timer', 'TimeLeft'],
      datasets: [{
        data: [0, time],
        backgroundColor: [
          '#ea5548',
          'rgb(172, 172, 172)',
        ],
        borderColor: [
          'rgb(172, 172, 172, 0.0)',
          'rgb(172, 172, 172, 0.0)',
        ],

        hoverBackgroundColor:[
          '#ea5548',
          'rgb(172, 172, 172)',
        ],
        cutout: '65%'
      }]
    };

    // pomodoroTimer block
    const pomodoroTimer = {
        id: 'pomodoroTimer',
        beforeDraw(chart, args, options) {
          const { ctx, chartArea: {width, height}} = chart;
          ctx.save();

          if(minutes === undefined && seconds === undefined){
            minutes = startingMinutes;
            seconds = '00';
            if(startingMinutes < 10){
              minutes = '0' + startingMinutes;
            }
          }

          ctx.font = 'bolder 30px Arial';
          ctx.fillStyle = 'black';
          ctx.textAlign = 'center';
          ctx.fillText(`${minutes}:${seconds}`, width / 2, height / 2 + 15);
          ctx.restore();

          if(time == 0){
            ctx.font = 'bolder 10px Arial';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText("Time's Up!", width / 2, height / 2 + 70);
          }

          /* if(time > 0){
            ctx.font = 'bolder 10px Arial';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.fillText('Work', width / 2, height / 2 + 70);
          } */


        }

    }

    // config 
    const config = {
      type: 'doughnut',
      data,
      options: {
        plugins:{
            legend:{
               display: false
            },
            tooltip:{
               enabled: false
            },
        }
        
      },
      plugins: [pomodoroTimer]
    };

    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );

    
    function updateCountDown(){
        minutes = Math.floor((time-1) / 60);
        seconds = (time-1) % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds ;
        minutes = minutes < 10 ? '0' + minutes : minutes ;
        time --;
        timeLeft ++; 

        //updatechart
        myChart.config.data.datasets[0].data[0] = timeLeft;
        myChart.config.data.datasets[0].data[1] = time;
        myChart.update();

        const audio = document.createElement("audio");
        audio.src = "./js/alarm.mp3";

        //stop loop
        if( time == 0 ){
          stopTimer(); 
          audio.play();
        }

      }


      document.getElementById('start').addEventListener('click',() => {
        if(document.getElementById('setWorkTime').disabled === false){
          startingMinutes = document.getElementById('setWorkTime').value;
          time = startingMinutes * 60 ;
        }
        clear = setInterval(updateCountDown, 1000);
        document.getElementById('setWorkTime').disabled = true;
        document.getElementById('start').disabled = true;
        document.getElementById('pause').disabled = false;
        document.getElementById('reset').disabled = false;
        document.getElementById('breakBtn').disabled = false;
      });

      document.getElementById('pause').addEventListener('click',() => {
        clearInterval(clear);
        clearTimeout(clear);
        document.getElementById('pause').disabled=true;
        document.getElementById('start').disabled=false;

      });

      document.getElementById('reset').addEventListener('click',() => {
        document.getElementById('setWorkTime').disabled =false;
        document.getElementById('pause').disabled=true;
        document.getElementById('start').disabled=false;
        var breakTimeEnd = document.getElementById('setTimer');
        breakTimeEnd.innerHTML = `
        <input id= "setWorkTime" type="number" name="" value="25">
        `;
        time = 25 * 60;
        timeLeft = 0;
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        clearInterval(clear);
        clearTimeout(clear);
        myChart.config.data.datasets[0].data = [0, time];
        myChart.config.data.datasets[0].backgroundColor = [
          '#ea5548',
          'rgb(172, 172, 172)',
        ];
        myChart.config.data.datasets[0].hoverBackgroundColor =[
          '#ea5548',
          'rgb(172, 172, 172)',
        ];
        myChart.update();
      })

      document.getElementById('breakBtn').addEventListener('click', () => {
        document.getElementById('setWorkTime').disabled =false;
        document.getElementById('pause').disabled=true;
        document.getElementById('start').disabled=false;
        var breakTime = document.getElementById('setTimer');
        breakTime.innerHTML = `
        <input id= "setWorkTime" type="number" name="" value="5">
        `;
        time = 5 * 60;
        timeLeft = 0;
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        clearInterval(clear);
        clearTimeout(clear);
        myChart.config.data.datasets[0].data = [0, time];
        myChart.config.data.datasets[0].backgroundColor = [
          'rgb(172, 172, 172)',
          '#b5e254',
        ];
        myChart.config.data.datasets[0].hoverBackgroundColor =[
          'rgb(172, 172, 172)',
          '#b5e254',
        ];
        myChart.update();
      })

      function stopTimer(){
        document.getElementById('pause').disabled=true;
        document.getElementById('start').disabled=true;
        clearInterval(clear);
        clearTimeout(clear);
      }
  }


document.querySelector('.AddTaskButton').addEventListener('click', function () {
  addTodos();
});

document.querySelector('.todo__input').addEventListener('keypress', function (e) {
  if (e.which === 13) {
    addTodos();
  }
});

function addTodos() {
  const inputValue = document.querySelector('.todo__input').value;

  if (inputValue.trim().length === 0) return;
  const newTodo = document.createElement('ul');
  newTodo.classList.add('listBoxes');
  newTodo.innerHTML =`
      <label class="todo__title">
        <input class="todo__check" name= "radiobutton" type="radio" value=”radiobutton”>
        <p class="todo__name">${escapeHtml(inputValue)}</p>
        <button class="btn-delete">X</button>
      </label>
  `
  document.querySelector('#listBoxes').appendChild(newTodo);
  document.querySelector('.todo__input').value = '';

}
  
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

document.querySelector('#listBoxes').addEventListener('click', function (event) {
  const target = event.target;
  if (target.classList.contains('btn-delete')) {
    target.parentNode.remove();
    const ClockTitle = document.querySelector('#ClockTitle');
    ClockTitle.innerHTML =`
    <div id = "listName" class="h1">Please Choose a Task</div>
    `
  }
});

document.querySelector('#listBoxes').addEventListener('click', function (event) {
  const target = event.target;
  if (target.classList.contains('todo__check')) {
    const ClockTitle = document.querySelector('#ClockTitle');
    ClockTitle.innerHTML =`
    <div id = "listName" class="h1">${target.parentNode.querySelector('p').textContent}</div>
    `
  }
});

}