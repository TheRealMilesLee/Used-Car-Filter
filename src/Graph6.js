import * as d3 from 'd3';
import { size } from './Diagrams.js';
import { getGraph6Data } from './Graph5.js';
import { Step6CarFilter } from './graphDataCleaning.js';
import { createFilteredTable } from './ChartMaker.js';
import { Graph7_data_cleaning } from './graphDataCleaning.js';
import { budget } from './Behavior.js';
import { SelectedAge } from './Graph2.js';
import { MileageSelected } from './Graph3.js';
import { TransmissionSelected} from './Graph4.js';
import { BrandSelected} from './Graph5.js';

export let ModelSelected;
export let getGraph7Data;

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

export function ModelSalesChart_Distribution() {
  const margin = { top: 40, right: 20, bottom: 30, left: 40 };
  const width = Math.min(size.width || 800, window.innerWidth) - margin.left - margin.right;
  const height = Math.min(size.height || 400, window.innerHeight * 0.7) - margin.top - margin.bottom;
  const radius = Math.min(width, height) / 2.5;

  d3.select('#Graph6').selectAll('*').remove();

  const svg = d3.select('#Graph6')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

  // Get the data from cleaning
  const Graph6_data_cleaning_result = getGraph6Data;

  const pie = d3.pie().value(d => d.sold);
  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  const arcs = svg.selectAll('arc')
    .data(pie(Graph6_data_cleaning_result))
    .enter()
    .append('g')
    .attr('class', 'arc');

  arcs.append('path')
    .attr('d', arc)
    .attr('class', 'pie-slice')
    .attr('fill', (d, i) => COLORS[i % COLORS.length]);

  arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => d.Graph6_data_cleaning_result.model)
    .style('font-size', '12px')
    .style('fill', 'white')
    .style('font-weight', 'bold');

  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${radius + 20}, ${-radius})`);

  const legendItems = legend.selectAll('.legend-item')
    .data(Graph6_data_cleaning_result)
    .enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', (d, i) => `translate(0, ${i * 25})`);

  legendItems.append('rect')
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', (d, i) => COLORS[i % COLORS.length]);

  legendItems.append('text')
    .attr('x', 24)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('font-size', '12px')
    .style('fill', 'white')
    .text(d => `${d.model}: ${d.sold}`);

  svg.append('text')
    .attr('class', 'chart-title')
    .attr('x', 0)
    .attr('y', -height / 2 - 10)
    .attr('text-anchor', 'middle')
    .style('font-size', '18px')
    .style('fill', 'white')
    .text('Model Sales Distribution');

  function resize() {
    const newWidth = Math.min(size.width || 800, window.innerWidth) - margin.left - margin.right;
    const newHeight = Math.min(size.height || 400, window.innerHeight * 0.7) - margin.top - margin.bottom;
    const newRadius = Math.min(newWidth, newHeight) / 2.5;

    svg.attr('width', newWidth + margin.left + margin.right)
       .attr('height', newHeight + margin.top + margin.bottom);

    svg.attr('transform', `translate(${newWidth / 2 + margin.left},${newHeight / 2 + margin.top})`);

    arc.outerRadius(newRadius);

    arcs.selectAll('path').attr('d', arc);
    arcs.selectAll('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`);

    legend.attr('transform', `translate(${newRadius + 20}, ${-newRadius})`);

    svg.select('.chart-title')
      .attr('y', -newHeight / 2 - 10);
  }

  d3.select(window).on('resize', resize);

  // Make on hover effect
  chartContainer_graph6.selectAll("arc")
  .on("click", function (event, d)
  {
      ModelSelected = d.model;
      alert(`You have selected ${ ModelSelected } model`);
      document.getElementById("AfterModelPrompt").style.display = "block";
      document.getElementById("FilterTable6").style.display = "block";

      // Clear Previous Table if exists
      const filterTable6 = document.querySelector("#FilterTable6");
      filterTable6.innerHTML = "";
      let filteredData = Step6CarFilter();
      // Call the function to create and display the table
      createFilteredTable(filterTable6, filteredData);
      if (ModelSelected !== null)
      {
          getGraph7Data = Graph7_data_cleaning(budget, SelectedAge, MileageSelected, 
              TransmissionSelected, BrandSelected, ModelSelected);
          document.querySelector("#EngineCategoryChart").style.display = "block";
      }
      // Scroll to the BarChart section
      document.querySelector("#EngineCategoryChart").scrollIntoView({ behavior: "smooth" });
  });
}

