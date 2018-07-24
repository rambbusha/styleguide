
//mobile charts fill
let chartBars = document.querySelectorAll('li.chart .chart-bar-inner');

chartBars.forEach(el=>el.style.width = Number(el.dataset.fill) + '%')


//tablet / dextops

function count(holder , time , value , speed = 50){
  let valueNow = 0;
  const pase = Math.ceil(value / (time/speed));

  const addToIt = () => {
    valueNow += pase
    if(valueNow >= value) valueNow = value
    holder.innerText = valueNow +'K'
  }
  addToIt();

  let myInterval;
  myInterval = window.setInterval(addToIt,speed);

  window.setTimeout(()=>{
    window.clearInterval(myInterval)
    if(valueNow < value) holder.innerText = value +'K'
  },time)
}


count(document.querySelector('.articles h2'),2000,167)
count(document.querySelector('.followers h2'),2000,234)









