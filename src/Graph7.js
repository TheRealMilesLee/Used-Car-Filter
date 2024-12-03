import * as d3 from 'd3';
import { size } from './Diagrams.js';

const data = [
  { capacity: "1.5L", count: 2500 },
  { capacity: "2.0L", count: 3500 },
  { capacity: "2.5L", count: 1800 },
  { capacity: "3.0L", count: 1200 },
  { capacity: "3.5L", count: 800 },
];

const COLORS = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087'];

export function EngineCategoryDistribution() {
  const margin = { top: 40, right: 20, bottom: 30, left: 40 };
  const width = Math.min(size.width || 800, window.innerWidth) - margin.left - margin.right;
  const height = Math.min(size.height || 400, window.innerHeight * 0.7) - margin.top - margin.bottom;
  const radius = Math.min(width, height) / 3;

  d3.select('#Graph7').selectAll('*').remove();

  const svg = d3.select('#Graph7')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

  const pie = d3.pie().value(d => d.count);
  const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);

  const arcs = svg.selectAll('arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');

  arcs.append('path')
    .attr('d', arc)
    .attr('class', 'donut-slice')
    .attr('fill', (d, i) => COLORS[i % COLORS.length]);

  const labelArc = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

  arcs.append('text')
    .attr('transform', d => `translate(${labelArc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => d.data.capacity)
    .attr('class', 'donut-label')
    .style('font-size', '12px')
    .style('font-weight', 'bold');

  const legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${-width / 2 + 20}, ${-height / 2 + 20})`);

  const legendItems = legend.selectAll('.legend-item')
    .data(data)
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
    .attr('class', 'legend-text')
    .style('font-size', '12px')
    .text(d => `${d.capacity}: ${d.count}`);

  svg.append('text')
    .attr('class', 'chart-title')
    .attr('x', 0)
    .attr('y', -height / 2 - 10)
    .attr('text-anchor', 'middle')
    .style('font-size', '18px')
    .text('Engine Capacity Distribution');

  function resize() {
    const newWidth = Math.min(size.width || 800, window.innerWidth) - margin.left - margin.right;
    const newHeight = Math.min(size.height || 400, window.innerHeight * 0.7) - margin.top - margin.bottom;
    const newRadius = Math.min(newWidth, newHeight) / 3;

    svg.attr('width', newWidth + margin.left + margin.right)
       .attr('height', newHeight + margin.top + margin.bottom);

    svg.attr('transform', `translate(${newWidth / 2 + margin.left},${newHeight / 2 + margin.top})`);

    arc.innerRadius(newRadius * 0.6).outerRadius(newRadius);
    labelArc.innerRadius(newRadius * 0.9).outerRadius(newRadius * 0.9);

    arcs.selectAll('path').attr('d', arc);
    arcs.selectAll('text')
      .attr('transform', d => `translate(${labelArc.centroid(d)})`);

    legend.attr('transform', `translate(${-newWidth / 2 + 20}, ${-newHeight / 2 + 20})`);

    svg.select('.chart-title')
      .attr('y', -newHeight / 2 - 10);
  }

  d3.select(window).on('resize.graph7', resize);
}

