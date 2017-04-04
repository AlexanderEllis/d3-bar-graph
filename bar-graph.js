    
    let svg = d3.select( 'svg' );
        
    let margin = { top: 20, right: 30, bottom: 30, left: 60 };
    let width =  +svg.attr('width');
    let height = +svg.attr('height');
    


    let URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json'

    d3.json(URL,  function( error, data ) {
    
        let x = d3.scaleBand()
            .rangeRound( [margin.left, width - margin.right] )
            .paddingInner( .1 );

        let y = d3.scaleLinear()
            .range( [height - margin.bottom, margin.top] );
            
        
        x.domain( data.data.map( d => d[0] ) );
        y.domain( [0, d3.max( data.data, d => +d[1] ) ] );
            
        
        
        
        let bar = svg.selectAll( 'g' )
            .data(data.data)
            .enter().append( 'g' )
            .attr( 'transform', d => 'translate(' + x( d[0] ) + ',0)' )
            
            


        bar.append( 'rect' )
            .attr( 'y', d => y( +d[1] ) )
            .attr( 'height', d => height - y( +d[1] ) -  margin.bottom )
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


        svg.append('g')
            .attr('transform', 'translate(0,' + y(0) + ')')
            .call(d3.axisBottom(x)
                .tickValues(x.domain().filter((d, i) => !(+d.slice(0, 4)%5) && (d.slice(5,7) === '01') ))
                .tickFormat(d => d.slice(0, 4)));


        svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',0)')
            .call(d3.axisLeft(y).ticks(6));

    });