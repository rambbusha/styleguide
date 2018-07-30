const temperaturesData = [
  {'date' : 1 , 'tepmerature' : 65, 'hour' : '8 AM'},
  {'date' : 2 , 'tepmerature' : 86, 'hour' : '12 PM'},
  {'date' : 3 , 'tepmerature' : 79, 'hour' : '4 PM'},
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





/*
svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
          return d.tepmerature;
        })
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
          return (parentWidth/dataLength) * i + 20;
        })
        .attr("y", function(d) {
          return height;
        })
        .attr("font-family", "Montserrat, sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "black");
        */