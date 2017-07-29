const width = 500;
const height = 500;
const padding = 15;
const xMin = d3.min(states, function(d) { return d.population / d.area; });
const xMax = d3.max(states, function(d) { return d.population / d.area; });
const yMin = d3.min(states, function(d) { return d.medianIncome; });
const yMax = d3.max(states, function(d) { return d.medianIncome; });
const rMin = d3.min(states, function(d) { return d.area; });
const rMax = d3.max(states, function(d) { return d.area; });

const partisanScore = function(d) {
  return d.republicanReps / (d.republicanReps + d.democraticReps);
};

const xScale = d3.scaleLinear()
                  .domain([xMin, xMax])
                  .range([padding, width - padding]);

const yScale = d3.scaleLinear()
                  .domain([yMin, yMax])
                  .range([height - padding, padding]);

const rScale = d3.scaleLinear()
                  .domain([rMin, rMax])
                  .range([5, 45]);

const colorScale = d3.scaleLinear()
                      .domain([0, 1])
                      .range(['blue', 'red']);

const svg = d3.select("body")
          .append("svg")
            .attr("width", width)
            .attr("height", height);

svg.selectAll("circle")
 .data(states)
 .enter()
 .append("circle")
   .attr("cx", function(d) { return xScale(d.population / d.area); })
   .attr("cy", function(d) { return yScale(d.medianIncome); })
   .attr("r", function(d) { return rScale(d.area); })
   .attr('fill', function(d) {return colorScale(partisanScore(d)); })
   .on('mouseover', function(d) {
      return console.log(d.name);
   });
