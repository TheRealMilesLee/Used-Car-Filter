import * as d3 from 'd3';
import { size } from "./Diagrams.js";
import { getGraph4Data } from './Graph3.js';
import { Step4CarFilter } from './graphDataCleaning.js';
export function BarChart_TransmissionDistribution()
{
  // Clear previous chart
  d3.select("#Graph4").selectAll("*").remove();
  // Set up the margin for the chart
  const margin = { top: 25, right: 55, bottom: 25, left: 85 };
  const width = size.width - margin.left - margin.right - 40;
  const height = size.height - margin.top - margin.bottom - 60;
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
    .padding(0.3);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(Graph4_data_cleaning_result, d => d.count)])
    .range([height, 0]);

  // Set up the axis
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Draw the axis
  chartContainer_graph4.append("g")
    .attr("transform", `translate(0, ${ height })`)
    .call(xAxis);

  chartContainer_graph4.append("g")
    .call(yAxis);

  // Draw the bars
  chartContainer_graph4.selectAll("rect")
    .data(Graph4_data_cleaning_result)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.transmission))
    .attr("y", d => yScale(d.count))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.count)) // Reduced height to make rectangles smaller
    .attr("fill", "#E5F9FF");

  // Draw the labels
  chartContainer_graph4.selectAll("text")
    .data(Graph4_data_cleaning_result)
    .enter()
    .append("text")
    .text(d => d.transmission)
    .attr("x", d => xScale(d.transmission) + xScale.bandwidth() / 2)
    .attr("y", d => yScale(d.count) - 5)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("fill", "lightgray");

  // Draw the x-axis label
  chartContainer_graph4.append("text")
    .attr("x", width / 2)
    .attr("y", height + 35)
    .attr("text-anchor", "middle")
    .attr("font-size", "15px")
    .attr("fill", "white")
    .text("Transmission");

  // Draw the y-axis label
  chartContainer_graph4.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -75)
    .attr("text-anchor", "middle")
    .attr("font-size", "15px")
    .attr("fill", "white")
    .text("Number of Cars");

  // Make on hover effect
  chartContainer_graph4.selectAll("rect")
    .on("mouseover", function (event, d)
    {
      d3.select(this)
        .attr("r", 7);

      // Show the tooltip
      tooltipGroup.style("display", null)
        .attr("transform", `translate(${ xScale(d.transmission) + xScale.bandwidth() / 2 }, ${ yScale(d.count) - 20 })`); // Centered tooltip

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
      SelectedTransmission = d.transmission;

      alert("You have selected the " + SelectedTransmission + " Transmission. Here's what we found for you.");

      document.querySelector("#AfterTransmissionPrompt").style.display = "block";
      document.querySelector("#FilterTable4").style.display = "block";
      // Clear previous table if exists
      const filterTable4 = document.querySelector("#FilterTable4");
      filterTable4.innerHTML = "";
      let filteredData = Step4CarFilter();
      // Call the function to create and display the table
      createFilteredTable(filterTable4, filteredData);
      if (MileageSelected !== null)
      {
        getGraph5Data = Graph5_data_cleaning(budget, SelectedAge, MileageSelected, SelectedTransmission);
        document.querySelector("#CityBrandChart").style.display = "block";
      }
      // Scroll to the BarChart section
      document.querySelector("#CityBrandChart").scrollIntoView({ behavior: "smooth" });
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

