/*const temperaturesData = [
  {'date' : 1 , 'tepmerature' : 65, 'hour' : '8 AM'},
  {'date' : 2 , 'tepmerature' : 86, 'hour' : '12 PM'},
  {'date' : 3 , 'tepmerature' : 79, 'hour' : '4 PM'},
  {'date' : 4 , 'tepmerature' : 62, 'hour' : '8 PM'},
  {'date' : 5 , 'tepmerature' : 59, 'hour' : '12 AM'},
  {'date' : 6 , 'tepmerature' : 52, 'hour' : '4 AM'},
  {'date' : 6 , 'tepmerature' : 57, 'hour' : '4 AM'},
]*/
const temperaturesData = [
  {'date' : 1 , 'tepmerature' : 55, 'hour' : '8 AM'},
  {'date' : 2 , 'tepmerature' : 36, 'hour' : '12 PM'},
  {'date' : 3 , 'tepmerature' : 89, 'hour' : '4 PM'},
  {'date' : 4 , 'tepmerature' : 62, 'hour' : '8 PM'},
  {'date' : 5 , 'tepmerature' : 59, 'hour' : '12 AM'},
  {'date' : 6 , 'tepmerature' : 52, 'hour' : '4 AM'},
  {'date' : 6 , 'tepmerature' : 57, 'hour' : '4 AM'},
]




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

window.addEventListener('resize',debounce(windowResizeHandler))


function windowResizeHandler(e){
  chart(temperaturesData,'date','tepmerature','temperature-wrapper',200,d3.select('svg.weather-chart') ,5)
}


function chart(data,val1,val2,parent,height , svg , stroke){
  const parentWidth = document.querySelector(`.${parent}`).offsetWidth + 20;
  const parentHeight = height;
  
  const x = d3.scaleLinear().range([0,parentWidth]);
  const y = d3.scaleLinear().range([parentHeight * 2,0]);
  const line = d3.line()
               .x((d)=>x(d[val1]))
               .y((d)=>y(d[val2]))
               .curve(d3.curveBundle.beta(0.2))
  
 
 
  const drawIt = (data) => {
    x.domain(d3.extent(data,(d)=>d[val1]))
    y.domain(d3.extent(data, (d)=>d[val2]))
    svg.selectAll('*').remove();
    svg.attr('width',parentWidth)
       .attr('height',parentHeight)

    svg.append('g')
        .attr('class','main')
        .attr('stroke-width',stroke)
        .append('path')
        .data([data])
        .attr('d' , line)
        .attr('transform',`translate(-10,${-parentHeight})`)

    svg.append('g')
      .attr('class','mask')
      .attr('stroke-width',stroke * 4)
      .append('path')
      .data([data])
      .attr('d' , line)
      .attr('transform',`translate(-10,${-parentHeight - stroke * 2 })`)

    const dataLength = data.length;

    
  }

  drawIt(data)
}



chart(temperaturesData,'date','tepmerature','temperature-wrapper',200,d3.select('svg.weather-chart') ,5)





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
  




