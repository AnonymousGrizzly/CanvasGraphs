# CanvasGraphs
Some graphs created in JavaScript with html &lt;canvas> tag

<hr/>
<br/>
<h2>HOW TO USE</h2>
<ol>
  <li> General info: use <canvas tag with id of type of graph you want </li>
  <li><h3>Bar chart:</h3>
    <p>in BarGraph.js create a new array of objects like "let Data2 = {'first': 68, '...': ... }"</p>
    <p>create a variable with your graph name with Barchart object properties: canvas, seriesName, padding, gridScale,       gridColor, bar_data and colors</p>
    <p>use "yourGraphName".draw(); to draw graph and "yourGraphName".drawLegend();</p>
  </li>
  <li><h3>Pie chart:</h3>
    <p>in PieChart.js create a new variable with your data with object array</p>
    <p>create new variable with your graph name with Piechart properties: canvas, data and colors</p>
    <p>use "yourGraphName".draw(); to draw graph and "yourGraphName".drawLegend();</p>
  </li>
  <li><h3>Point chart:</h3>
    <p>in PointGraph.js create a new variable with your data with array</p>
    <p>create new variable with your graph name with PointGraph properties: canvas, seriesName, padding, gridScale, gridColor, points_data and color</p>
    <p>use "yourGraphName".draw(); to draw graph and "yourGraphName".drawLegend();</p>
  </li>
</ol>
<hr/>
see /test for usage
