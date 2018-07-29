const temperaturesData = [
  {'date' : 1 , 'tepmerature' : 65, 'hour' : '8 AM'},
  {'date' : 2 , 'tepmerature' : 86, 'hour' : '12 PM'},
  {'date' : 3 , 'tepmerature' : 79, 'hour' : '4 PM'},
  {'date' : 4 , 'tepmerature' : 62, 'hour' : '8 PM'},
  {'date' : 5 , 'tepmerature' : 59, 'hour' : '12 AM'},
  {'date' : 6 , 'tepmerature' : 52, 'hour' : '4 AM'},
  {'date' : 6 , 'tepmerature' : 57, 'hour' : '4 AM'},
]



function chart(data,val1,val2,parent,height , svg){
  const parentWidth = document.querySelector(`.${parent}`).offsetWidth + 20;
  
  const x = d3.scaleLinear().range([0,parentWidth]);
  const y = d3.scaleLinear().range([height * 2,0]);
  const line = d3.line()
               .x((d)=>x(d[val1]))
               .y((d)=>y(d[val2]))
               .curve(d3.curveBundle.beta(0.2))
  
 
 
  const drawIt = (data) => {
    x.domain(d3.extent(data,(d)=>d[val1]))
    y.domain(d3.extent(data, (d)=>d[val2]))

    svg.attr('width',parentWidth)
       .attr('height',height)
        .append('g')
        .append('path')
        .data([data])
        .attr('d' , line)
        .attr('transform',`translate(-10,${-height})`)


    const dataLength = data.length;

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
  }

  drawIt(data)
}



chart(temperaturesData,'date','tepmerature','temperature-wrapper',200,d3.select('svg.weather-chart'))





