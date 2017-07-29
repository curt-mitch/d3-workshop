const svgWidth = 500;
const svgHeight = 500;
const barWidth = 90;
const barGap = 10;

d3.select("body")
  .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
  .selectAll('rect')
    .data([
      svgHeight * Math.random(),
      svgHeight * Math.random(),
      svgHeight * Math.random(),
      svgHeight * Math.random(),
      svgHeight * Math.random()
    ])
    .enter()
  .append('rect')
    .attr('width', barWidth)
    .attr('height', d => d)
    .attr('y', d => svgHeight - d)
    .attr('x', (d, i) => (barWidth + barGap) * i)
    .attr('fill', 'blue');
