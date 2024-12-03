import * as d3 from 'd3';
import { size } from "./Diagrams.js";
import { budget } from './Behavior.js';
import { SelectedAge } from './Graph2.js';
import { MileageSelected } from './Graph3.js';
import { column_from_csv } from './csvReadIn.js';

export function BarChart_TransmissionDistribution() {
  // Set up the margin for the chart
  const margin = { top: 50, right: 55, bottom: 25, left: 105 };
  const width = size.width - margin.left - margin.right - 40;
  const height = size.height - margin.top - margin.bottom - 60;

  // Clear previous chart
  d3.select("#Graph4").selectAll("*").remove();

  // Set up the SVG container
  const chartContainer_graph4 = d3.select("#Graph4")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Filter and process the data
  const filteredData = column_from_csv.filter(d => 
    d.price <= budget && 
    d.age >= SelectedAge &&
    (MileageSelected ? d.mileage >= parseInt(MileageSelected.split('-')[0]) && d.mileage <= parseInt(MileageSelected.split('-')[1] || Infinity) : true)
  );

  const transmissionCounts = d3.rollup(filteredData, v => v.length, d => d.transmission);
  const data = Array.from(transmissionCounts, ([transmission, count]) => ({transmission, count}));

  // Set up the scales
  const xScale = d3.scaleBand()
    .domain(data.map(d => d.transmission))
    .range([0, width])
    .padding(0.3);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([height, 0]);

  // Set up the axis
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Draw the axis
  chartContainer_graph4.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  chartContainer_graph4.append("g")
    .call(yAxis);

  // Draw the bars
  chartContainer_graph4.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.transmission))
    .attr("y", d => yScale(d.count))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.count))
    .attr("fill", "#E5F9FF");

  // Draw the labels
  chartContainer_graph4.selectAll(".bar-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "bar-label")
    .attr("x", d => xScale(d.transmission) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.count) - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "white")
    .text(d => d.count);

  // Draw the x-axis label
  chartContainer_graph4.append("text")
    .attr("x", width / 2)
    .attr("y", height + 35)
    .attr("text-anchor", "middle")
    .attr("font-size", "15px")
    .text("Transmission Type")
    .attr("fill", "white");

  // Draw the y-axis label
  chartContainer_graph4.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -75)
    .attr("text-anchor", "middle")
    .attr("font-size", "15px")
    .text("Count")
    .attr("fill", "white");
}

