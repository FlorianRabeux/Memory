var time = 180;
var timer=null;

window.addEventListener('load',init,false);


function init() {
  try {
    document.getElementById('wrap').addEventListener('click',Chrono,false);
    document.getElementById('input').addEventListener('click',Set,false);
    document.querySelector('#audioPlayer').volume = 1;
    display();
  }
  catch (exp) {
      document.querySelector('#input').value = exp.message;
  }
}
function Chrono() {
  if (timer == null)
    timer = setInterval(function () {time--; display();}, 1000);
  else {
    clearInterval(timer);
    timer = null;
  }
}
function Set() {
  try {
    time = parseInt(document.querySelector('#input').value);
    if (isNaN(time)) throw new Error("Oups !");
    display();
  }
  catch (exp) {
      document.querySelector('#input').value = exp.message;
  }
}
function display() {
  if (time > 0) {
    var m = Math.floor(time/60);
    var s = Math.floor(time - (m*60));
    document.getElementById('m').innerHTML = "<span>"+m+":</span>";
    document.getElementById('s').innerHTML = "<span>"+s+"</span>";
  }
  else {
    document.getElementById('s').innerHTML = "<span>0</span>";
    Chrono();
    document.querySelector('#audioPlayer').play();
  }
}