let margin = { top: 20, right: 30, bottom: 30, left: 40 };
let width = 1200 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;

let x = d3.scaleBand()
    .rangeRound( [0, width] )
    .paddingInner( .1 );

let y = d3.scaleLinear()
    .range( [height, 0] );



var chart = d3.select( '.chart' )
    .attr( 'width', width )
    .attr( 'height', height )

let URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'

d3.json(URL,  function( error, data ) {
  
  x.domain( data.data.map( d => d[0] ) );
  y.domain( [0, d3.max( data.data, d => +d[1] ) ] );
    
  
  
  
  var bar = chart.selectAll( 'g' )
      .data(data.data)
    .enter().append( 'g' )
      .attr( 'transform', d => 'translate(' + x( d[0] ) + ',0)' )
     
  bar.append( 'rect' )
      .attr( 'y', d => y( +d[1] ) )
      .attr( 'height', d => height - y( +d[1] ) )
      .attr( 'width', x.bandwidth() )
      .on( 'mouseover', (d) => d3.select('.tooltip')
                                .style( 'visibility', 'visible' )
                                .html( d[0] + ': ' + d[1] ) )
  	  .on("mousemove", () =>  d3.select('.tooltip')
                                .style("top", (d3.event.pageY - 50) + 'px')
                                .style("left", (d3.event.pageX + 5) + 'px'))
      .on( 'mouseout', function() {
        d3.select('.tooltip').style( 'visibility', 'hidden' )
      })
  
  
  d3.select('body').append( 'div' )
      .attr( 'class', 'tooltip' )
      .style( 'position', 'absolute' )
      .style( 'z-index', '10' )
      .style( 'visibility', 'hidden')
      .style( 'height', '20px' )
      .style( 'background-color', '#f4f4f4' )
      .style( 'border', '1px solid #4286f4' )
      .style( 'border-radius', '3px' )
      .style( 'padding', '11px' )
  
  var xAxis = d3.axisBottom(x);
  
  xAxis.ticks(10)
  
  var yAxis = d3.axisRight(y);
  
  yAxis.ticks(2)
    
  chart.append("g")
      .attr('transform', 'translate(0,' + margin.top + ')' )
      .call(xAxis)
  
  chart.append('g')
      .call(yAxis)
});


console.log('hey');