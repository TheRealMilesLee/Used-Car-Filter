import * as d3 from 'd3';
import { size } from "./Diagrams.js";
import { getGraph5Data } from "./Graph4";

/**
 * @brief For this graph, we would like to show the distribution of the brands of the cars.
 * @return {void}
 */
export function PieChart_BrandDistribution()
{
  // First, clear any existing content
  d3.select('#Graph5').selectAll("*").remove();

  // Set up SVG dimensions
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const width = size.width - margin.left - margin.right;
  const height = size.height - margin.top - margin.bottom;
  const radius = Math.min(width, height) / 2 - 20;

  // Create the main SVG container
  const chartContainer_pie = d3.select('#Graph5')
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", `translate(${ width / 2 }, ${ height / 2 })`);

  // Data preprocessing
  const data = getGraph5Data;
  // Count the number of cars by each brand
  const BrandCount = d3.rollup(data, v => v.length, d => d.brand);
  // Convert the map to an array
  const BrandCountArray = Array.from(BrandCount, ([key, value]) => ({ brand: key, count: value }));
  // Sort the array by count
  BrandCountArray.sort((a, b) => b.count - a.count);

  // Compute the percentage of each brand
  const total = d3.sum(BrandCountArray, d => d.count);
  const brandPercentages = BrandCountArray.map(d => ({
    brand: d.brand,
    count: d.count,
    percentage: (d.count / total) * 100
  }));

  console.log(brandPercentages);

  // Set up the color scale based on the brand
  const color = d3.scaleOrdinal()
    .domain(brandPercentages.map(d => d.brand))
    .range(d3.schemeCategory10);

  // create the pie
  const pie = d3.pie().value(d => d.count);

  // Create the arc generator
  const arc = d3.arc().innerRadius(5).outerRadius(radius);

  // Draw the pie chart
  drawChart(brandPercentages, pie, arc, color, chartContainer_pie, radius, true);
}

function drawChart(brandPercentages, pie, arc, color, chartContainer_pie, radius, makeAnimation)
{
  // Clear existing content
  chartContainer_pie.selectAll("*").remove();

  const pieData = pie(brandPercentages);

  // Create the arcs
  const arcs = chartContainer_pie.selectAll(".arc")
    .data(pieData)
    .enter()
    .append("g")
    .attr("class", "arc");

  // Append the path for each arc with transition
  arcs.append("path")
    .attr("fill", d => color(d.data.brand))
    .transition()
    .duration(makeAnimation ? 750 : 0)
    .attrTween("d", function (d)
    {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function (t)
      {
        return arc(interpolate(t));
      };
    });
  // Create text labels with transition
  const textLabels = chartContainer_pie.selectAll("text")
    .data(pieData)
    .enter()
    .append("text")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("fill", "lightgray")
    .text(d =>
    {
      const percentage = d.data.percentage.toFixed(2);
      return `${ d.data.brand } (${ percentage }%)`;
    });

  textLabels.transition()
    .duration(makeAnimation ? 750 : 0)
    .attrTween("transform", function (d)
    {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function (t)
      {
        const interpolated = interpolate(t);
        const pos = arc.centroid(interpolated);
        const angle = midAngle(interpolated) * 180 / Math.PI - 90;
        pos[0] = pos[0] * 1.3;
        pos[1] = pos[1] * 1.3;
        let rotation;
        if (midAngle(interpolated) < Math.PI / 2)
        {
          rotation = angle;
        }
        else if (midAngle(interpolated) >= Math.PI / 2 && midAngle(interpolated) < Math.PI)
        {
          rotation = angle - 90;
        }
        else
        {
          rotation = angle + 180;
        }
        return `translate(${ pos }) rotate(${ rotation })`;
      };
    });

  // Create the color legend next to the pie chart
  const colorLegend = chartContainer_pie.selectAll(".color-legend")
    .data(brandPercentages)
    .enter()
    .append("g")
    .attr("class", "color-legend")
    .attr("transform", (_, i) => `translate(${ radius + 20 }, ${ 20 + i * 20 })`);

  colorLegend.append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", d => color(d.brand));

  colorLegend.append("text")
    .attr("x", 15)
    .attr("y", 10)
    .style("font-size", "12px")
    .text(d => d.brand)
    .style("fill", "lightgray");
}
function midAngle(d)
{
  return d.startAngle + (d.endAngle - d.startAngle) / 2;
}
