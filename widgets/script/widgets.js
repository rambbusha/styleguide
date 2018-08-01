const weatherChartWrapper = document.querySelector('.weather-chart-holder');
const weatherController = document.querySelectorAll('.weather-controller li');
const temepratureText = document.querySelectorAll('.temeperatures-holder li'); // MUST DO THEM WITH d3 BUT I FOUND IT EASYER LIKE THIS


function debounce(func,wait=10,immediate=false){
  let timeout;
  return function(){
      let context =this , args = arguments;
      let later = function(){
          timeout = null;
          if(!immediate) func.apply(context,args)
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later,wait);
      if(callNow) func.apply(context,args);
  }
}

window.addEventListener('resize' , debounce(resizeWeatherChart));

function resizeWeatherChart(e){
  drawWeatherChart(temperaturesData[document.querySelector('.weather-controller li.active').dataset.for]);
  if(window.innerWidth < 550){
    drawSmallChart(nasdaq , 'nasdaq');
    drawSmallChart(dow , 'dow');
  }else{
    drawBigChart(bigGraphData[document.querySelector('.stocks-header li.active').dataset.name].values);
  }
}

weatherController.forEach(el=>el.addEventListener('click',()=>{
  if(el.classList.contains('active'))return;
  document.querySelector('.weather-controller li.active').classList.remove('active');
  el.classList.add('active');
  updateWeatherChart(temperaturesData[el.dataset.for])

}))

let temperaturesData = {
  today : [
      {'date' : 1 , 'tepmerature' : 65, 'time' : '8AM'},
      {'date' : 2 , 'tepmerature' : 86, 'time' : '12PM'},
      {'date' : 3 , 'tepmerature' : 79, 'time' : '4PM'},
      {'date' : 4 , 'tepmerature' : 62, 'time' : '8PM'},
      {'date' : 5 , 'tepmerature' : 59, 'time' : '12AM'},
      {'date' : 6 , 'tepmerature' : 52, 'time' : '1AM'},
      {'date' : 7 , 'tepmerature' : 55, 'time' : '10AM'},
  ],
  tomorrow : [
    {'date' : 1 , 'tepmerature' : 45, 'time' : '8AM'},
    {'date' : 2 , 'tepmerature' : 52, 'time' : '12PM'},
    {'date' : 3 , 'tepmerature' : 49, 'time' : '4PM'},
    {'date' : 4 , 'tepmerature' : 62, 'time' : '8PM'},
    {'date' : 5 , 'tepmerature' : 67, 'time' : '12AM'},
    {'date' : 6 , 'tepmerature' : 65, 'time' : '1AM'},
    {'date' : 7 , 'tepmerature' : 58, 'time' : '5AM'},
  ],
  week :[
    {'date' : 1 , 'tepmerature' : 55, 'time' : 'MON'},
    {'date' : 2 , 'tepmerature' : 61, 'time' : 'TUE'},
    {'date' : 3 , 'tepmerature' : 57, 'time' : 'WED'},
    {'date' : 4 , 'tepmerature' : 64, 'time' : 'THU'},
    {'date' : 5 , 'tepmerature' : 50, 'time' : 'FRI'},
    {'date' : 6 , 'tepmerature' : 49, 'time' : 'SAT'},
    {'date' : 7 , 'tepmerature' : 55, 'time' : 'SUN'},
  ]
}

let x , y , line;
function drawWeatherChart(temperaturesData){ //temperaturesData -> for one day
  let width = weatherChartWrapper.offsetWidth;
  let height = 250; 

  document.querySelector('svg.weather-chart').innerHTML = ''

  let svg = d3.select('svg.weather-chart')
            .attr('width' , width)
            .attr('height' , height)

  //X and Y scaling
  x =  d3.scaleLinear().range([0,width]);
  y = d3.scaleLinear().range([height-40,40]); 

  line = d3.line()
          .x((d)=>x(d.date))
          .y((d)=>y(d.tepmerature))
          .curve(d3.curveBasis);
  
  x.domain(d3.extent(temperaturesData,(d)=>d.date));
  y.domain(d3.extent(temperaturesData,(d)=>d.tepmerature));

  svg.append('g')
   .attr('class','main')
   .append('path')
   .attr('stroke','rgb(255, 178, 53)')
   .attr('stroke-width','5')
   .data([temperaturesData])
   .attr('d',line)

  svg.append('g')
    .attr('class','mask')
    .append('path')
    .attr('stroke','rgb(255, 178, 53)')
    .attr('stroke-width','25')
    .attr('transform','translate(-2,-12)')
    .data([temperaturesData])
    .attr('d',line)
}


drawWeatherChart(temperaturesData.today)

        
function updateWeatherChart(data){

  temepratureText.forEach((el,idx)=>{
    el.innerHTML = `<h2>${data[idx].tepmerature}<span>o</span></h2><p>${data[idx].time}</p>`
  })

  y.domain(d3.extent(data,(d)=>d.tepmerature));
  d3.select('g.mask path')
    .data([data])
    .transition()
    .duration(1000)
    .attr('d',line)

  d3.select('g.main path')
    .data([data])
    .transition()
    .duration(1000)
    .attr('d',line)

}



// SMALL STOCK GRAPH

const nasdaq = [
  {idx : 1 , value : 28},
  {idx : 2 , value : 30},
  {idx : 3 , value : 28},
  {idx : 4 , value : 26},
  {idx : 5 , value : 30},
  {idx : 6 , value : 32},
  {idx : 7 , value : 30},
  {idx : 8 , value : 34},
  {idx : 9 , value : 36},
]

const dow = [
  {idx : 1 , value : 28},
  {idx : 2 , value : 30},
  {idx : 3 , value : 25},
  {idx : 4 , value : 28},
  {idx : 5 , value : 30},
  {idx : 6 , value : 32},
  {idx : 7 , value : 30},
  {idx : 8 , value : 28},
  {idx : 9 , value : 29},
]


function drawSmallChart(data , parent){ 
  let width = window.innerWidth/2 + 10;
  let height = 150; 

  document.querySelector(`.small-graph.${parent} svg`).innerHTML = '';

  let svg = d3.select(`.small-graph.${parent} svg`)
            .attr('width' , width)
            .attr('height' , height)
            .attr('fill','none')
            .attr('transform','translate(-5,0)')

  //X and Y scaling
  let x =  d3.scaleLinear().range([0,width]);
  let y = d3.scaleLinear().range([height-20,20]); 

  let line = d3.line()
          .x((d)=>x(d.idx))
          .y((d)=>y(d.value))
          .curve(d3.curveBasis);
  
  x.domain(d3.extent(data,(d)=>d.idx));
  y.domain(d3.extent(data,(d)=>d.value));

  svg.append('g')
   .attr('class','main')
   .append('path')
   .attr('stroke','rgb(255, 255, 255)')
   .attr('stroke-width','5')
   .data([data])
   .attr('d',line)

  svg.append('g')
    .attr('class','mask')
    .append('path')
    .attr('stroke','rgb(255, 255, 255)')
    .attr('stroke-width','20')
    .attr('transform','translate(-2,-10)')
    .data([data])
    .attr('d',line)
}



drawSmallChart(nasdaq , 'nasdaq');
drawSmallChart(dow , 'dow');



//BIG STOCK GRAPH

const bigGraphControlls = document.querySelectorAll('.stocks-header li')
bigGraphControlls.forEach(el=>el.addEventListener('click',(e)=>{
  if(el.classList.contains('active')) return;
  document.querySelector('.stocks-header li.active').classList.remove('active');
  el.classList.add('active');

  const personData = bigGraphData[el.dataset.name];

  updateBigChart(personData.values);
  updateBigChartInfos(personData.name,personData.statistics);
}))


const bigGraphData = {
  nasdaq : {
    name : 'NASDAQ',
    statistics : {
      low : 126.88,
      high : 127.61,
      open : 127.88,
      marketCap : '735.34B',
      dividend : '1.63%',
      pE : '15.73',
      ammount : 127.33, //not sure what this is 
    },
    values : [
      {idx : 1 , value : 115 , month : 'Apr'},
      {idx : 2 , value : 110 , month : 'May'},
      {idx : 3 , value : 112 , month : 'Jun'},
      {idx : 4 , value : 120 , month : 'Jul'},
      {idx : 5 , value : 135 , month : 'Aug'},
      {idx : 6 , value : 128 , month : 'Sep'},
      {idx : 7 , value : 135 , month : 'Oct'},
      {idx : 8 , value : 136 , month : 'Nov'},
      {idx : 9 , value : 145 , month : 'Dec'},
      {idx : 10 , value : 128 , month : 'Jan'},
      {idx : 11 , value : 124 , month : 'Feb'},
      {idx : 12 , value : 130 , month : 'Mar'},
    ]
  },
  appl : {
    name : 'APPL',
    statistics : {
      low : 12.88,
      high : 227.61,
      open : 187.88,
      marketCap : '35.34B',
      dividend : '3.63%',
      pE : '15.1',
      ammount : 213.33, //not sure what this is 
    },
    values : [
      {idx : 1 , value : 85 , month : 'Apr'},
      {idx : 2 , value : 90 , month : 'May'},
      {idx : 3 , value : 112 , month : 'Jun'},
      {idx : 4 , value : 90 , month : 'Jul'},
      {idx : 5 , value : 84 , month : 'Aug'},
      {idx : 6 , value : 80 , month : 'Sep'},
      {idx : 7 , value : 91 , month : 'Oct'},
      {idx : 8 , value : 95 , month : 'Nov'},
      {idx : 9 , value : 99 , month : 'Dec'},
      {idx : 10 , value : 110 , month : 'Jan'},
      {idx : 11 , value : 121 , month : 'Feb'},
      {idx : 12 , value : 125 , month : 'Mar'},
    ]
  },
  dow : {
    name : 'DOW J',
    statistics : {
      low : 1.88,
      high : 512.61,
      open : 319.88,
      marketCap : '210.34B',
      dividend : '0.63%',
      pE : '28.91',
      ammount : 510.21, //not sure what this is 
    },
    values : [
      {idx : 1 , value : 81 , month : 'Apr'},
      {idx : 2 , value : 92 , month : 'May'},
      {idx : 3 , value : 80 , month : 'Jun'},
      {idx : 4 , value : 81 , month : 'Jul'},
      {idx : 5 , value : 85 , month : 'Aug'},
      {idx : 6 , value : 89 , month : 'Sep'},
      {idx : 7 , value : 90 , month : 'Oct'},
      {idx : 8 , value : 120 , month : 'Nov'},
      {idx : 9 , value : 125 , month : 'Dec'},
      {idx : 10 , value : 130 , month : 'Jan'},
      {idx : 11 , value : 135 , month : 'Feb'},
      {idx : 12 , value : 110 , month : 'Mar'},
    ]
  },
  coog : {
    name : 'COOG',
    statistics : {
      low : 219.88,
      high : 221.61,
      open : 218.88,
      marketCap : '312.34B',
      dividend : '15.63%',
      pE : '50.12',
      ammount : 510.21, //not sure what this is 
    },
    values : [
      {idx : 1 , value : 120 , month : 'Apr'},
      {idx : 2 , value : 130 , month : 'May'},
      {idx : 3 , value : 135 , month : 'Jun'},
      {idx : 4 , value : 129 , month : 'Jul'},
      {idx : 5 , value : 125 , month : 'Aug'},
      {idx : 6 , value : 110 , month : 'Sep'},
      {idx : 7 , value : 120 , month : 'Oct'},
      {idx : 8 , value : 130 , month : 'Nov'},
      {idx : 9 , value : 100 , month : 'Dec'},
      {idx : 10 , value : 90 , month : 'Jan'},
      {idx : 11 , value : 91 , month : 'Feb'},
      {idx : 12 , value : 95 , month : 'Mar'},
    ]
  },
}


let xS , yS , lineS , y_axis , svgS;
function drawBigChart(data){ 
  let width = document.querySelector('.graph-pannel').offsetWidth + 20
  let height = 250; 

  document.querySelector(`.big-stock-svg svg`).innerHTML = '';

  svgS = d3.select(`.big-stock-svg svg`)
            .attr('width' , width)
            .attr('height' , height)
            .attr('fill','none')
            .attr('transform','translate(-35,0)')

  //X and Y scaling
  xS =  d3.scaleLinear().range([0,width]);
  yS = d3.scaleLinear().range([height-30,30]); 

  lineS = d3.line()
          .x((d)=>xS(d.idx))
          .y((d)=>yS(d.value))
          .curve(d3.curveBasis);
  
  xS.domain(d3.extent(data,(d)=>d.idx));
  yS.domain(d3.extent(data,(d)=>d.value));

  svgS.append('g')
   .attr('class','main')
   .append('path')
   .attr('stroke','rgb(255, 255, 255)')
   .attr('stroke-width','5')
   .data([data])
   .attr('d',lineS)

  svgS.append('g')
    .attr('class','mask')
    .append('path')
    .attr('stroke','rgb(255, 255, 255)')
    .attr('stroke-width','25')
    .attr('transform','translate(-2,-12)')
    .data([data])
    .attr('d',lineS)



  y_axis = d3.axisLeft()
            .ticks(6)
            .scale(yS)


  svgS.append('g')
    .attr('class','yAx')
    .attr('transform',`translate(${width - 35}, 0)`)
    .call(customYAxis)

  svgS.selectAll('.yAx text')
    .attr('fill','rgba(0,0,0,.3)')
    .attr('font-family','Montserrat')
    .attr('font-weight','bold')

}

function customYAxis(g) {
  g.call(y_axis);
  g.select(".domain").remove();
  g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "rgba(0,0,0,0)");
  g.selectAll(".tick text").attr("x", 10).attr("dy", -10);
}

drawBigChart(bigGraphData.appl.values);


function updateBigChart(data){
  yS.domain(d3.extent(data,(d)=>d.value));

  y_axis = d3.axisLeft()
              .ticks(6)
              .scale(yS)

  svgS.select('.yAx')
    .transition()
    .duration(1000)
    .call(customYAxis)
  
  svgS.select(".domain").remove()

  d3.select('.big-stock-svg g.mask path')
    .data([data])
    .transition()
    .duration(1000)
    .attr('d',lineS)

  d3.select('.big-stock-svg g.main path')
    .data([data])
    .transition()
    .duration(1000)
    .attr('d',lineS)

  svgS.selectAll('.yAx text')
    .attr('fill','rgba(0,0,0,.3)')
    .attr('font-family','Montserrat')
    .attr('font-weight','bold')

}

function updateBigChartInfos(name,{low,ammount,dividend,high,marketCap,open,pE}){
  const w = document.querySelector('.panel-header');
  w.querySelector('.names').innerText = name; 
  w.querySelector('.info-one').innerHTML = `<li><p class='low-opac'>Low</p><p>${low}</p></li><li><p class='low-opac'>High</p><p>${high}</p></li><li><p class='low-opac'>Open</p><p>${open}</p></li>`;
  w.querySelector('.info-two').innerHTML = `<li><p class='low-opac'>Market cap</p><p>${marketCap}</p></li><li><p class='low-opac'>Dividend yield</p><p>${dividend}</p></li><li><p class='low-opac'>P/E ratio (ttm)</p><p>${pE}</p></li>`;
}



/* MATCHES */
const matchHolders = document.querySelectorAll('li.match');

const fakeMatchesData = {
  '0' : {
    'team1' : 'Montreal Canadiens',
    'team2' : 'Ottawa Senators',
    'team1-score-details' : '3-1-0',
    'team2-score-details' : '1-3-0',
    'scores-on-steps' : {
      '1' : [0,0],
      '2' : [0,0],
      '3' : [0,0],
      'ot' : [0,1],
      'final' : [0,1],
    },
    'cup-name': 'Stanley Cup Playoffs',
    'match-date' : 'WEDNESDAY, APRIL 22, 5:00 PM',
    'match-place' : 'CONSOL Energy Center, Pittsburgh',
    'match-url' : '#',
  },
  '1' : {
    'team1' : 'New York Rangers',
    'team2' : 'Pittsburgh Penguins',
    'team1-score-details' : '1-2-0',
    'team2-score-details' : '2-1-0',
    'scores-on-steps' : {
      '1' : [1,0],
      '2' : [1,1],
      '3' : [0,0],
      'ot' : [0,0],
      'final' : [2,1],
    },
    'cup-name': 'Fake Cup Playoffs',
    'match-date' : 'MONDAY, NOVEMBER 23, 5:00 AM',
    'match-place' : 'CONSOL Energy Center, Pittsburgh2',
    'match-url' : '#',
  },
  '2' : {
    'team1' : 'St. Louis Blues',
    'team2' : 'Minnesota Wild',
    'team1-score-details' : '3-1-0',
    'team2-score-details' : '1-3-0',
    'scores-on-steps' : {
      '1' : [2,0],
      '2' : [1,1],
      '3' : [2,1],
      'ot' : [1,0],
      'final' : [6,1],
    },
    'cup-name': 'Stanley Cup Playoffs',
    'match-date' : 'WEDNESDAY, APRIL 22, 5:00 PM',
    'match-place' : 'CONSOL Energy Center, Pittsburgh',
    'match-url' : '#',
  },
  '3' : {
    'team1' : 'Anaheim Duks',
    'team2' : 'Winnipeg Jets',
    'team1-score-details' : '3-1-0',
    'team2-score-details' : '1-3-0',
    'scores-on-steps' : {
      '1' : [0,0],
      '2' : [4,1],
      '3' : [0,0],
      'ot' : [1,1],
      'final' : [5,2],
    },
    'cup-name': 'Fake Cup Two',
    'match-date' : 'TUESDAY, MARCH 13, 5:00 PM',
    'match-place' : 'CONSOL Energy Center, Pittsburgh',
    'match-url' : '#',
  }
}

const loaded = []

matchHolders.forEach((el,id)=>el.querySelector('.match-basic-content').addEventListener('click',(e)=>{
  if(el.classList.contains('expanded')){
    el.classList.remove('expanded')
  }else{
    if(loaded.indexOf(el) < 0){ // not loaded data once
      el.classList.add('loading');
      loaded.push(el)
      const matchData = matchDetailsMaker(fakeMatchesData[String(id)]);
      window.setTimeout(()=>{
        el.classList.remove('loading');
        el.querySelector('.match-details').append(matchData)
        window.setTimeout(()=>{el.classList.add('expanded')},200)
      }, Math.ceil(Math.random()*3)*1000)
    }else{
      el.classList.add('expanded')
    } //data alredy loaded
    
  }
}))

function matchDetailsMaker(match){
  const steps = match['scores-on-steps'];
  let matchDetailsContent = document.createElement('div');
  matchDetailsContent.classList.add('match-details-content');
  const matchContent = `<div class='score-details-header'><p class='team1-score-detail'>${match['team1-score-details']}</p><p class='final-tag'>Final</p>`+
                        `<p class='team2-score-detail'>${match['team2-score-details']}</p></div><table><thead><tr><th></th><th>1</th><th>2</th><th>3</th><th>OT</th><th>TOTAL</th></tr></thead>`+
                        `<tr><th>${match.team1}</th><th>${steps['1'][0]}</th><th>${steps['2'][0]}</th><th>${steps['3'][0]}</th><th>${steps['ot'][0]}</th><th>${steps['final'][0]}</th></tr>`+
                        `<tr><th>${match.team2}</th><th>${steps['1'][1]}</th><th>${steps['2'][1]}</th><th>${steps['3'][1]}</th><th>${steps['ot'][1]}</th><th>${steps['final'][1]}</th></tr>`+
                        `</table><div class='match-date-stream'><div class='match-date'><p class='match-for'>${match['cup-name']}</p><p class='match-day'>${match['match-date']}</p><p class='match-place'>${match['match-place']}</p>`+
                        `</div><div class='match-stream'><a href='${match['match-url']}'><svg class='play-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`+
                        `<use xlink:href='#play'></use></svg></a></div></div>`;
                        console.log(matchContent)
  matchDetailsContent.innerHTML = matchContent;
  return matchDetailsContent;
}


/* PAGINATION */    
    
const pageBubles = document.querySelectorAll('.pagination li');
let activePage = Number(document.querySelector('.pagination li.active').dataset['page']);
const footerArrows = document.querySelectorAll('.footer-arrows');
const nPages = pageBubles.length;


footerArrows.forEach(el=>el.addEventListener('click',()=>{
  const towards = Number(el.dataset.to);
  
  if((towards==-1 && activePage==0) || (towards == 1 && activePage==nPages-1)) return
  changeActiveBuble(pageBubles[activePage + towards] , activePage + towards)

}))
pageBubles.forEach((el,idx)=>el.addEventListener('click',()=>changeActiveBuble(el,idx)))
      
function changeActiveBuble(el,idx){
    if(el.classList.contains('active')) return;
    pageBubles[activePage].classList.remove('active');
    activePage = idx;
    pageBubles[idx].classList.add('active');
}