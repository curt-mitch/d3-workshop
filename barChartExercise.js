var width = 1000;
var height = 600;
var padding = {
  left: 40,
  top: 10,
  right: 0,
  bottom: 100,
};

function partisanScore(d) {
  return d.republicanReps / (d.democraticReps + d.republicanReps);
}

var svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

var yMin = d3.min(states, function (d) { return d.medianIncome; });
var yMax = d3.max(states, function (d) { return d.medianIncome; });

var xScale = d3.scaleBand()
                .domain(states.map(function (d) { return d.name; }))
                .range([padding.left, width - padding.right])
                .padding(0.1);

var yScale = d3.scaleLinear()
                .domain([yMin, yMax])
                .range([height - padding.top, padding.bottom]);

var colorScale = d3.scaleLinear()
                    .domain([0, 1])
                    .range(['blue', 'red']);

var rects = svg.selectAll('rect')
                .data(states)
                .enter()
                .append('rect');

rects.attr('x', function (d) { return xScale(d.name)})
      .attr('width', xScale.bandwidth())
      .attr('y', height - padding.bottom)
      .attr('height', 0)
      .attr('fill', function (d) { return colorScale(partisanScore(d)); });

svg.append('g')
    .attr('transform', `translate(${padding.left}, ${padding.top - padding.bottom})`)
    .call(d3.axisLeft(yScale));

svg.append('g')
    .attr("transform", `translate(0,${height - padding.bottom+padding.top})`)
    .call(d3.axisBottom(xScale))
  .selectAll('text')
    .attr('transform', `rotate(90) translate(${padding.top},${(-3 - xScale.bandwidth() / 2)})`)
    .style('text-anchor', 'start');

var tooltipDiv = d3.select('body')
                    .append('div')
                    .attr('class', 'tooltip')
                    .style('opacity', 0);

rects.on('mouseover', function(d) {
  tooltipDiv.html(`<p>${d.name}</p><p>$${d.medianIncome}</p>`);

  var width = parseInt(tooltipDiv.style('width'));
  var height = parseInt(tooltipDiv.style('height'));

  tooltipDiv.style('left', `${d3.event.pageX - (width / 2)}px`);
  tooltipDiv.style('top', `${d3.event.pageY - height - 20}px`);

  tooltipDiv.style('opacity', 1);
})
  .on('mouseout', function() {
    tooltipDiv.style('opacity', 0);
  });

var t = d3.transition()
          .duration(2000);

rects.transition(t)
    .ease(d3.easeExpOut)
    .attr('y', function (d) { return yScale(d.medianIncome) - padding.bottom + padding.top; })
    .attr('height', function (d) { return height - yScale(d.medianIncome); });
