import * as d3 from 'd3';
import { size } from "./Diagrams.js";
import { getGraph5Data } from './Graph4.js';
import { Step5CarFilter } from './graphDataCleaning.js';
import { createFilteredTable } from './ChartMaker.js';
import { Graph6_data_cleaning } from './graphDataCleaning.js';
import { budget } from './Behavior.js';
import { SelectedAge } from './Graph2.js';
import { MileageSelected } from './Graph3.js';
import { TransmissionSelected} from './Graph4.js';

export let BrandSelected;
export let getGraph6Data;


export function HorizontalBarChart_CityBrandDistribution() {
    // Set up the margin for the chart
    const margin = { top: 50, right: 30, bottom: 30, left: 120 };
    const width = size.width - margin.left - margin.right - 40;
    const height = size.height - margin.top - margin.bottom - 60;

    // Clear previous chart
    d3.select("#Graph5").selectAll("*").remove();

    // Set up the SVG container
    const svg = d3.select("#Graph5")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    // Get the data from cleaning
    const Graph5_data_cleaning_result = getGraph5Data;

    // Set up the scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(Graph5_data_cleaning_result, d => d.count)])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .domain(Graph5_data_cleaning_result.map(d => d.brand))
        .range([0, height])
        .padding(0.1);

    // Set up the axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Remove previous axes
    svg.selectAll(".axis").remove();

    // Draw the axes
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .call(yAxis);

    // Draw the bars
    const bars = svg.selectAll(".bar")
        .data(Graph5_data_cleaning_result);

    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .merge(bars)
        .transition()
        .duration(1000)
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "#E5F9FF");

    bars.exit().remove();

    // Draw the labels
    const labels = svg.selectAll(".bar-label")
        .data(Graph5_data_cleaning_result);

    labels.enter()
        .append("text")
        .attr("class", "bar-label")
        .merge(labels)
        .transition()
        .duration(1000)
        .attr("x", d => xScale(d.count) + 5)
        .attr("y", d => yScale(d.brand) + yScale.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .attr("fill", "white")
        .text(d => d.count);

    labels.exit().remove();

    // Update the chart title
    svg.select(".chart-title").remove();
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("fill", "white")
        .text(`Car Sales by Brand in ${selectedCity}`);

    // Make on hover effect
    chartContainer_graph5.selectAll("rect")
    .on("mouseover", function (event, d)
    {
        d3.select(this)
        .attr("fill", "#B0E0E6");

        // Show the tooltip
        tooltipGroup.style("display", null)
        .attr("transform", `translate(${ xScale(d.brand) + xScale.bandwidth() / 2 }, ${ yScale(d.count) - 20 })`); // Centered tooltip

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
        BrandSelected = d.brand;
        alert(`You have selected ${ BrandSelected } brand`);
        document.getElementById("AfterCityBrandPrompt").style.display = "block";
        document.getElementById("FilterTable5").style.display = "block";

        // Clear Previous Table if exists
        const filterTable5 = document.querySelector("#FilterTable5");
        filterTable5.innerHTML = "";
        let filteredData = Step5CarFilter();
        // Call the function to create and display the table
        createFilteredTable(filterTable5, filteredData);
        if (BrandSelected !== null)
        {
            getGraph6Data = Graph6_data_cleaning(budget, SelectedAge, MileageSelected, 
                TransmissionSelected, BrandSelected);
            document.querySelector("#ModelSalesChart").style.display = "block";
        }
        // Scroll to the BarChart section
        document.querySelector("#ModelSalesChart").scrollIntoView({ behavior: "smooth" });
    });
}

