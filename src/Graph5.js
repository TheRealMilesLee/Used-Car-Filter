import * as d3 from 'd3';
import { size } from "./Diagrams.js";

// Static data for demonstration
const cityData = {
    "Moscow": [
        { brand: "Toyota", count: 1200 },
        { brand: "Volkswagen", count: 1000 },
        { brand: "Ford", count: 800 },
        { brand: "BMW", count: 600 },
        { brand: "Mercedes", count: 500 },
    ],
    "Saint Petersburg": [
        { brand: "Volkswagen", count: 900 },
        { brand: "Toyota", count: 850 },
        { brand: "Ford", count: 700 },
        { brand: "Audi", count: 550 },
        { brand: "BMW", count: 500 },
    ],
    "Novosibirsk": [
        { brand: "Lada", count: 700 },
        { brand: "Toyota", count: 600 },
        { brand: "Hyundai", count: 500 },
        { brand: "Kia", count: 450 },
        { brand: "Volkswagen", count: 400 },
    ]
};

export function HorizontalBarChart_CityBrandDistribution() {
    // Set up the margin for the chart
    const margin = { top: 50, right: 30, bottom: 30, left: 120 };
    const width = size.width - margin.left - margin.right - 40;
    const height = size.height - margin.top - margin.bottom - 60;

    // Clear previous chart
    d3.select("#Graph5").selectAll("*").remove();

    // Create city selector
    const selectorContainer = d3.select("#CityBrandChart-Graph5")
        .insert("div", "svg")
        .attr("class", "selector-container");

    const citySelector = selectorContainer.append("select")
        .attr("id", "citySelector")
        .on("change", updateChart);

    citySelector.selectAll("option")
        .data(Object.keys(cityData))
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

    // Set up the SVG container
    const svg = d3.select("#Graph5")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


    function updateChart() {
    const selectedCity = citySelector.property("value");
    const data = cityData[selectedCity].sort((a, b) => b.count - a.count);

    const svg = d3.select("#Graph5 g");
    svg.selectAll("*").remove();

    // Set up the scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count)])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
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
        .data(data);

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
        .data(data);

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
    }

    // Initial chart render
    updateChart();
    }

