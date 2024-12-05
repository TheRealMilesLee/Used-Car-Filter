import * as d3 from 'd3';
import { size } from "./Diagrams.js";
import { getGraph4Data } from './Graph3.js';
import { Step4CarFilter } from './graphDataCleaning.js';
import { createFilteredTable } from './ChartMaker.js';
import { DropDownMenu_data_cleaning } from './graphDataCleaning.js';
import { SelectedAge } from './Graph2.js';
import { budget } from '../app.js';
import { MileageSelected } from './Graph3.js';
import { updateBrandModelDropdown } from './SelectBrandModel.js';
import { mountFinalCarList, mountBrandPieChart } from "./Diagrams";
import { onResize } from './Diagrams.js';
export let TransmissionSelected;
export let getGraph5Data;

/**
 * @brief For this graph, we would like to show the distribution of the transmission of the cars.
 * @return {void}
 */
export function BarChart_TransmissionDistribution()
{
  // Set up the margin for the chart
  const margin = { top: 50, right: 55, bottom: 25, left: 105 }; // Increased left margin to move the chart to the right
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
    .attr("transform", `translate(${ margin.left }, ${ margin.top })`);

  // Get the data from cleaning
  const Graph4_data_cleaning_result = getGraph4Data;

  // Set up the scales
  const xScale = d3.scaleBand()
    .domain(Graph4_data_cleaning_result.map(d => d.transmission))
    .range([0, width])
    .padding(0.3); // Increased padding to make rectangles thinner

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(Graph4_data_cleaning_result, d => d.count)])
    .range([height, 0])
    .nice();

  // Set up the axis
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Draw the axis
  chartContainer_graph4.append("g")
    .attr("transform", `translate(0, ${ height })`)
    .call(xAxis)
    .selectAll("text")
    .attr("fill", "white");

  chartContainer_graph4.append("g")
    .call(yAxis)
    .selectAll("text")
    .attr("fill", "white");

  // Draw the bars
  chartContainer_graph4.selectAll("rect")
    .data(Graph4_data_cleaning_result)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.transmission))
    .attr("y", d => yScale(d.count))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.count))
    .attr("fill", "#E5F9FF");

  // Draw the labels
  chartContainer_graph4.selectAll(".bar-label")
    .data(Graph4_data_cleaning_result)
    .enter()
    .append("text")
    .attr("class", "bar-label")
    .text(d => d.count)
    .attr("x", d => xScale(d.transmission) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.count) - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("fill", "white");

  // Draw the x-axis label
  chartContainer_graph4.append("text")
    .attr("x", width / 2)
    .attr("y", height + 35)
    .attr("text-anchor", "middle")
    .attr("font-size", "15px")
    .text("Transmission")
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

  // Make on hover effect
  chartContainer_graph4.selectAll("rect")
    .on("mouseover", function (event, d)
    {
      d3.select(this)
        .attr("fill", "#B0E0E6");

      // Show the tooltip
      tooltipGroup.style("display", null)
        .attr("transform", `translate(${ xScale(d.transmission) + xScale.bandwidth() / 2 }, ${ yScale(d.count) - 20 })`); // Centered tooltip

      // Update the tooltip text
      tooltipGroup.select(".tooltip-text")
        .text(`${ d.count }`);
    })
    .on("mouseout", function (event, d)
    {
      d3.select(this)
        .attr("fill", "#E5F9FF");
      tooltipGroup.style("display", "none");
    })
    .on("click", function (event, d)
    {
      TransmissionSelected = d.transmission;
      alert(`You have selected ${ TransmissionSelected } transmission`);
      document.getElementById("AfterTransmissionPrompt").style.display = "block";
      document.getElementById("FilterTable4").style.display = "block";

      // Clear Previous Table if exists
      const filterTable4 = document.querySelector("#FilterTable4");
      filterTable4.innerHTML = "";
      let filteredData = Step4CarFilter();
      // Call the function to create and display the table
      createFilteredTable(filterTable4, filteredData);
      if (TransmissionSelected !== undefined && TransmissionSelected !== null)
      {
        // Mount the next pie chart
        getGraph5Data = DropDownMenu_data_cleaning(budget, SelectedAge, MileageSelected, TransmissionSelected);
        document.querySelector("#DropDownBrandModel").style.display = "block";
        mountFinalCarList();
        mountBrandPieChart();
        // Scroll to the BarChart section
        document.querySelector("#DropDownBrandModel").scrollIntoView({ behavior: "smooth" });
        updateBrandModelDropdown();
        // Dispatch a custom event to redraw the BrandPieChart
        const customEventG5 = new Event('customRedrawG5');
        window.dispatchEvent(customEventG5);
      }
    });

  // Add a group for the tooltip and dashed line
  const tooltipGroup = chartContainer_graph4.append("g")
    .attr("class", "tooltip-group")
    .style("display", "none");

  tooltipGroup.append("text")
    .attr("class", "tooltip-text")
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "white")
    .style("font-weight", "bold");
}

// Monitor the TransmissionSelected variable and redraw the graph when it changes
window.addEventListener('customRedrawG5', redrawG5, false);

function redrawG5()
{
  console.log("Redrawing Graphs 5 - BrandPieChart");
  if (TransmissionSelected !== undefined && TransmissionSelected !== null)
  {
    console.log("Redrawing Graphs 5");
    const targets = [
      { target: document.querySelector('#BrandPieChart-Graph5'), contentRect: document.querySelector('#BrandPieChart-Graph5').getBoundingClientRect() },
    ];
    onResize(targets);
  }
}
