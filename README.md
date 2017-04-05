# d3 Bar Graph

This is a graph of the US GDP using d3.  

You can preview it [here](https://alexanderellis.github.io/d3-bar-graph/).

One issue I ran into was axis ticks for scaleBands.  I ended up creating a custom tickValues array from the filtered domain.  You can read more about the issue [here](https://github.com/d3/d3-axis/issues/35).