const fakeData = [[120, 253, 34], [167, 234, 28], [220, 198, 12], [121, 150, 10], [180, 135, 8], [80, 215, 5], [79, 139, 3]]
const bigBar = document.querySelector('.chart-big-bar-inner');
const chartsHolder = document.querySelector('.charts');
const chartCards = chartsHolder.querySelectorAll('.chart');
const arrows = document.querySelectorAll('.arrow-slider');

//mobile charts fill
let chartBars = document.querySelectorAll('li.chart .chart-bar-inner');
chartBars.forEach(el => el.style.width = Number(el.dataset.fill) + '%')

let clickable = true;
let myInterval = [];
let myTimeOut = [];

//tablet / dextops
function count(holder, time, value, speed = 50) {
  let valueNow = 0;
  holder.innerText = 0;

  const pase = Math.ceil(value / (time / speed));

  const addToIt = () => {
    valueNow += pase
    if (valueNow >= value) valueNow = value;

    holder.innerText = valueNow + 'K'
  }
  addToIt();
  myInterval.push(window.setInterval(addToIt, speed));
  myTimeOut.push(window.setTimeout(() => {
    myInterval.forEach(el => window.clearInterval(el))
    if (valueNow < value) holder.innerText = value + 'K'
  }, time))
}

let activeId = 1;

function showData(id) {
  const elData = fakeData[id];
  count(document.querySelector('.articles h2'), 2000, elData[0])
  count(document.querySelector('.followers h2'), 2000, elData[1])
  bigBar.style.width = `${elData[2]}%`
}
showData(activeId)

chartCards.forEach(el => el.addEventListener('click', () => {
  if (el.classList.contains('active') || window.innerWidth < 650 || !clickable) return;
  const chartId = Number(el.dataset.id);
  moveCards(activeId, chartId)
}));

chartsHolder.addEventListener('transitionend', (e) => {
  if (e.target !== chartsHolder) return;
  clickable = true
})

arrows.forEach(el => el.addEventListener('click', (e) => {
  let to = Number(el.dataset.to);
  console.log(to)
  if ((activeId == 0 && to == -1) || (activeId == fakeData.length - 1 && to == 1)) return;

  moveCards(activeId, activeId + to)
}))

function moveCards(oldId, newId) {
  clickable = false;
  console.log(oldId, newId)
  myInterval.forEach(el => window.clearInterval(el))
  myTimeOut.forEach(el => window.clearTimeout(el))

  chartCards[oldId].classList.remove('active');
  chartCards[newId].classList.add('active');
  chartsHolder.style.transform = `translateX(${25 - 50 * newId}%)`
  showData(newId)
  activeId = newId
}


