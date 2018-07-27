const temperaturesData = [
  {'date' : 1 , 'tepmerature' : 65, 'hour' : '8 AM'},
  {'date' : 2 , 'tepmerature' : 86, 'hour' : '12 PM'},
  {'date' : 3 , 'tepmerature' : 79, 'hour' : '4 PM'},
  {'date' : 4 , 'tepmerature' : 62, 'hour' : '8 PM'},
  {'date' : 5 , 'tepmerature' : 59, 'hour' : '12 AM'},
  {'date' : 6 , 'tepmerature' : 52, 'hour' : '4 AM'},
  {'date' : 6 , 'tepmerature' : 60, 'hour' : '4 AM'},
]



function chart(data,val1,val2,width , height , svg){
  const x = d3.scaleLinear().range([0,width]);
  const y = d3.scaleLinear().range([height,0]);
  const line = d3.line()
               .x((d)=>x(d[val1]))
               .y((d)=>y(d[val2]))
               .curve(d3.curveBundle.beta(0.2))
  
  svg.append('g')
 

  const drawIt = (data) => {
    x.domain(d3.extent(data,(d)=>d[val1]))
    y.domain(d3.extent(data, (d)=>d[val2]))

    svg.append('path')
        .data([data])
        .attr('d' , line)
  }

  drawIt(data)
}



chart(temperaturesData,'date','tepmerature',300,300,d3.select('svg.weather-chart'))





