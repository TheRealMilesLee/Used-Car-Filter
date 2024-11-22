import * as d3 from 'd3';
import { size } from "./Diagrams.js";
import { getGraph2Data } from '../app.js';
import { Step2CarFilter } from './CarFilter.js';
import { createFilteredTable } from './ChartMaker.js';
export let SelectedAge;

/**
 * For this graph, we would like to show the correlation under the user's budget betweenn the age of the car and the price of the car.
 * We will use a line chart to show the correlation between the age of the car and the price of the car.
 */
export function LineChart_AgePriceCorrelation()
{
  // Set up the margin for the chart
  const margin = { top: 25, right: 55, bottom: 25, left: 105 }; // Increased left margin to move the chart to the right
  const width = size.width - margin.left - margin.right - 40;
  const height = size.height - margin.top - margin.bottom - 60;

  // Clear previous chart
  d3.select("#Graph2").selectAll("*").remove();

  // Set up the SVG container
  const chartContainer_graph2 = d3.select("#Graph2")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
    .attr("transform", `translate(${ margin.left }, ${ margin.top })`);

  // Clean the data and get the grouped data
  const data_cleaned = getGraph2Data;

  // Set up the x and y axis
  const x = d3.scaleLinear()
    .domain([d3.min(data_cleaned, d => d.age), d3.max(data_cleaned, d => d.age)])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data_cleaned, d => d.price)]) // Start y-axis from 0
    .range([height, 0]);


  const xAxis = d3.axisBottom(x)
    .ticks(data_cleaned.length / 2)
    .tickSize(0)
    .tickPadding(10);

  const yAxis = d3.axisLeft(y)
    .ticks(data_cleaned.length / 2)
    .tickPadding(10);

  // Append the x and y axis
  chartContainer_graph2.append("g")
    .attr("transform", `translate(0, ${ height })`)
    .call(xAxis);

  chartContainer_graph2.append("g")
    .call(yAxis);

  // Create the line generator
  const line = d3.line()
    .x(d => x(d.age))
    .y(d => y(d.price));

  // Append the path for the line chart
  const path = chartContainer_graph2.append("path")
    .datum(data_cleaned)
    .attr("fill", "none")
    .attr("stroke-width", 5)
    .attr("d", line)
    .attr("stroke", "#5AC8FA")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-opacity", 0.8);


  // Animate the line chart
  const totalLength = path.node().getTotalLength();

  path.attr("stroke-dasharray", `${ totalLength } ${ totalLength }`)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(1000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);


  // Create the x-axis label
  chartContainer_graph2.append("text")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .attr("text-anchor", "middle")
    .text("Age of Car")
    .style("font-size", "12px")
    .style("fill", "lightgray");

  // Create the y-axis label
  chartContainer_graph2.append("text")
    .attr("x", -height / 2 + 10)
    .attr("y", -75) // Adjusted y position to account for increased left margin
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Price")
    .style("font-size", "12px")
    .style("fill", "lightgray");

  // Add data points to the line chart
  chartContainer_graph2.selectAll(".data-point")
    .data(data_cleaned)
    .enter()
    .append("circle")
    .attr("class", "data-point")
    .attr("cx", d => x(d.age))
    .attr("cy", d => y(d.price))
    .attr("r", 5)
    .attr("fill", "#E5F9FF")
    .on("mouseover", function (event, d)
    {
      d3.select(this)
        .attr("r", 7);

      // Show the tooltip
      tooltipGroup.style("display", null)
        .attr("transform", `translate(${ x(d.age) }, ${ y(d.price) - 10 })`);

      // Update the tooltip text
      tooltipGroup.select(".tooltip-text")
        .text(`$${ d.price.toFixed(2) }`);
    })
    .on("mouseout", function ()
    {
      d3.select(this)
        .attr("r", 5);
      tooltipGroup.style("display", "none");
    })
    .on("click", function (event, d)
    {
      SelectedAge = d.age;
      alert(`You have selected the age of ${ SelectedAge } years. Here's what we found for you.`);
      document.querySelector("#AfterAgePrompt").style.display = "block";
      document.querySelector("#FilterTable2").style.display = "block";
      // Clear previous table if exists
      const filterTable2 = document.querySelector("#FilterTable2");
      filterTable2.innerHTML = "";
      let filteredData = Step2CarFilter();

      // Call the function to create and display the table
      createFilteredTable(filterTable2, filteredData);

      // Scroll to the BarChart section
      document.querySelector("#BarChart").scrollIntoView({ behavior: "smooth" });
    });

  // Add a group for the tooltip and dashed line
  const tooltipGroup = chartContainer_graph2.append("g")
    .attr("class", "tooltip-group")
    .style("display", "none");

  tooltipGroup.append("text")
    .attr("class", "tooltip-text")
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "white")
    .style("font-weight", "bold");
}
