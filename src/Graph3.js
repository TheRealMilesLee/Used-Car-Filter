import * as d3 from 'd3';
import { size } from "./Diagrams.js";
import { Graph3_data_cleaning } from './graphDataCleaning.js';
import { getGraph3Data } from '../app.js';

export function ScatterPlot_MileagePriceCorrelation()
{
  // Set up the margin for the chart
  const margin = { top: 25, right: 55, bottom: 25, left: 105 }; // Increased left margin to move the chart to the right
  const width = size.width - margin.left - margin.right - 40;
  const height = size.height - margin.top - margin.bottom - 60;

  // Clear previous chart
  d3.select("#Graph3").selectAll("*").remove();

  // Set up the SVG container
  const chartContainer_graph3 = d3.select("#Graph3")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", `translate(${ margin.left }, ${ margin.top })`);

  // Clean the data and get the grouped data
  const Graph3_data_cleaning_result = getGraph3Data;
  console.log("Data cleaned for Graph3:", Graph3_data_cleaning_result);

  // Set up the scales
  const xScale = d3.scaleBand()
    .domain(Graph3_data_cleaning_result.map(d => d.mileage))
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(Graph3_data_cleaning_result, d => d.price)])
    .range([height, 0]);

  // Set up the axis
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Draw the axis
  chartContainer_graph3.append("g")
    .attr("transform", `translate(0, ${ height })`)
    .call(xAxis);

  chartContainer_graph3.append("g")
    .call(yAxis);

  // Draw the circles
  chartContainer_graph3.selectAll("circle")
    .data(Graph3_data_cleaning_result)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.mileage) + xScale.bandwidth() / 2)
    .attr("cy", d => yScale(d.price))
    .attr("r", 5)
    .attr("fill", "#E5F9FF");

  // Draw the labels
  chartContainer_graph3.selectAll("text")
    .data(Graph3_data_cleaning_result)
    .enter()
    .append("text")
    .text(d => d.Make)
    .attr("x", d => xScale(d.mileage) + xScale.bandwidth() / 2 + 10)
    .attr("y", d => yScale(d.price) + 5)
    .attr("font-size", "10px")
    .attr("fill", "lightgray");

  // Draw the x-axis label
  chartContainer_graph3.append("text")
    .attr("x", width / 2)
    .attr("y", height + 35)
    .attr("text-anchor", "middle")
    .attr("font-size", "15px")
    .text("Mileage")
    .attr("fill", "white");

  // Draw the y-axis label
  chartContainer_graph3.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -75)
    .attr("text-anchor", "middle")
    .attr("font-size", "15px")
    .text("Price")
    .attr("fill", "white");
}
