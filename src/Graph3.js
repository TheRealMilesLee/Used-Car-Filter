import * as d3 from 'd3';
import { size } from "./Diagrams.js";
import { getGraph3Data } from './Graph2.js';
import { Step3CarFilter } from './graphDataCleaning.js';
import { createFilteredTable } from './ChartMaker.js';
import { Graph4_data_cleaning } from './graphDataCleaning.js';
import { SelectedAge } from './Graph2.js';
import { budget } from './Behavior.js';

export let MileageSelected;
export let getGraph4Data;
export function BarChart_MileagePriceCorrelation()
{
  // Set up the margin for the chart
  const margin = { top: 50, right: 55, bottom: 25, left: 105 }; // Increased left margin to move the chart to the right
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

  // Set up the scales
  const xScale = d3.scaleBand()
    .domain(Graph3_data_cleaning_result.map(d => d.mileage))
    .range([0, width])
    .padding(0.3); // Increased padding to make rectangles thinner

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

  // Draw the bars
  chartContainer_graph3.selectAll("rect")
    .data(Graph3_data_cleaning_result)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.mileage))
    .attr("y", d => yScale(d.price))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.price) - 10) // Reduced height to make rectangles smaller
    .attr("fill", "#E5F9FF");

  // Draw the labels
  chartContainer_graph3.selectAll("text")
    .data(Graph3_data_cleaning_result)
    .enter()
    .append("text")
    .text(d => d.Make)
    .attr("x", d => xScale(d.mileage) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.price) - 5)
    .attr("text-anchor", "middle")
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

  // Make on hover effect
  chartContainer_graph3.selectAll("rect")
    .on("mouseover", function (event, d)
    {
      d3.select(this)
        .attr("r", 7);

      // Show the tooltip
      tooltipGroup.style("display", null)
        .attr("transform", `translate(${ xScale(d.mileage) + xScale.bandwidth() / 2 }, ${ yScale(d.price) - 20 })`); // Centered tooltip

      // Update the tooltip text
      tooltipGroup.select(".tooltip-text")
        .text(`$${ d.price.toFixed(2) }`);
    })
    .on("mouseout", function (event, d)
    {
      d3.select(this)
        .attr("r", 5);
      tooltipGroup.style("display", "none");
    })
    .on("click", function (event, d)
    {
      MileageSelected = d.mileage;

      alert("You have selected the mileage of " + MileageSelected + " miles. Here's what we found for you.");

      document.querySelector("#AfterMileagePrompt").style.display = "block";
      document.querySelector("#FilterTable3").style.display = "block";
      // Clear previous table if exists
      const filterTable3 = document.querySelector("#FilterTable3");
      filterTable3.innerHTML = "";
      let filteredData = Step3CarFilter();
      // Call the function to create and display the table
      createFilteredTable(filterTable3, filteredData);
      if (MileageSelected !== null)
      {
        getGraph4Data = Graph4_data_cleaning(budget, SelectedAge, MileageSelected);
        document.querySelector("#TransmissionBarChart").style.display = "block";
      }
      // Scroll to the BarChart section
      document.querySelector("#TransmissionBarChart").scrollIntoView({ behavior: "smooth" });
    });
  // Add a group for the tooltip and dashed line
  const tooltipGroup = chartContainer_graph3.append("g")
    .attr("class", "tooltip-group")
    .style("display", "none");

  tooltipGroup.append("text")
    .attr("class", "tooltip-text")
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "white")
    .style("font-weight", "bold");
}
