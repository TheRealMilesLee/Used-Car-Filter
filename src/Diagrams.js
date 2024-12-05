/**
 * @fileoverview This file contains the functions to render the diagrams on the page.
 */
import * as d3 from 'd3';
import { isEmpty, debounce } from 'lodash';
import { SankeyDiagram_Overview } from './Graph1.js';
import { LineChart_AgePriceCorrelation } from './Graph2.js';
import { BarChart_MileagePriceCorrelation } from './Graph3.js';
import { BarChart_TransmissionDistribution } from './Graph4.js';
import { PieChart_BrandDistribution } from './Graph5.js';
import { column_from_csv } from './csvReadIn.js';
export let size = { width: 0, height: 0 };

/**
 * @brief Handles the resize event for specified target elements and redraws the corresponding graphs.
 *
 * This function is triggered on resize events and iterates over the provided targets. It checks if the target's ID
 * matches one of the predefined graph IDs. If it does, it updates the size of the graph and redraws it using the
 * appropriate function.
 *
 * @param {Array} targets - An array of resize observer entries, each containing information about the resized element.
 *
 * @returns {void}
 */
export const onResize = (targets) =>
{
  targets.forEach(target =>
  {
    const targetId = target.target.getAttribute('id');
    if (!['Sankey-Graph1', 'LineChart-Graph2', 'BarChart-Graph3', 'TransmissionBarChart-Graph4', 'BrandPieChart-Graph5'].includes(targetId)) return;
    size = { width: target.contentRect.width, height: target.contentRect.height };
    if (isEmpty(size) || !column_from_csv || isEmpty(column_from_csv)) return;
    const graphMap = {
      'Sankey-Graph1': { selector: '#Graph1', redraw: SankeyDiagram_Overview },
      'LineChart-Graph2': { selector: '#Graph2', redraw: LineChart_AgePriceCorrelation },
      'BarChart-Graph3': { selector: '#Graph3', redraw: BarChart_MileagePriceCorrelation },
      'TransmissionBarChart-Graph4': { selector: '#Graph4', redraw: BarChart_TransmissionDistribution },
      'BrandPieChart-Graph5': { selector: '#Graph5', redraw: PieChart_BrandDistribution }
    };
    d3.select(graphMap[targetId].selector).selectAll('*').remove();
    graphMap[targetId].redraw(column_from_csv);
  });
};

/**
 * @function SankeyDiagram
 * @brief Renders a Sankey diagram for the used car market trend.
 * @returns {string} HTML string representing the Sankey diagram.
 */
export const SankeyDiagram = () => (
  `<div id='Sankey-Graph1'>
        <h3 class="SankeyTitle"> Used Car Market Trend</h3>
        <svg id='Graph1'></svg>
        <i>  <b> Graph 1. </b> Overall View of used car sold situation. </i>
    </div>`
);

/**
 * @function LineChart
 * @brief Renders a line chart for the relationship between age and price.
 * @returns {string} HTML string representing the line chart.
 */
export const LineChart = () => (
  `<div id='LineChart-Graph2'>
      <svg id='Graph2'></svg>
      <i>  <b> Graph 2. </b> Relationship between Age and Price. Select the data point on the chart to Continue. </i>
    </div>`
);

/**
 * @function BarChart
 * @brief Renders a bar chart for the relationship between mileage and price.
 * @returns {string} HTML string representing the bar chart.
 */
export const BarChart = () => (
  `<div id='BarChart-Graph3'>
        <svg id='Graph3'></svg>
        <i>  <b> Graph 3. </b> Relationship between Mileage and Price. </i>
    </div>`
);

/**
 * @function TransmissionBarChart
 * @brief Renders a bar chart for the distribution of transmission types.
 * @returns {string} HTML string representing the bar chart.
 */
export const TransmissionBarChart = () => (
  `<div id='TransmissionBarChart-Graph4'>
    <svg id='Graph4'></svg>
    <i>  <b> Graph 4. </b> Distribution of Transmission Types. </i>
  </div>`
);

/**
 * @function BrandPieChart
 * @brief Renders a pie chart for the distribution of car brands.
 * @returns {string} HTML string representing the pie chart.
 */
export const BrandPieChart = () => (
  `<div id='BrandPieChart-Graph5'>
    <svg id='Graph5'></svg>
    <i>  <b> Graph 5. </b> Distribution of Brands. </i>
  </div>`
);

// Create a ResizeObserver instance
const chartObserver = new ResizeObserver(debounce(onResize, 100));

/**
 * @function mountSankey
 * @brief Mounts the Sankey diagram to the DOM.
 * @returns {void}
 */
export function mountSankey()
{
  let Graph1Container = document.querySelector('#Sankey-Graph1');
  if (Graph1Container)
  {
    chartObserver.observe(Graph1Container);
  }
}

/**
 * @function mountLineChart
 * @brief Mounts the line chart to the DOM.
 * @returns {void}
 */
export function mountLineChart()
{
  let Graph2Container = document.querySelector('#LineChart-Graph2');
  if (Graph2Container)
  {
    chartObserver.observe(Graph2Container);
  }
}

/**
 * @function mountBarChart
 * @brief Mounts the bar chart to the DOM.
 * @returns {void}
 */
export function mountBarChart()
{
  let Graph3Container = document.querySelector('#BarChart-Graph3');
  if (Graph3Container)
  {
    chartObserver.observe(Graph3Container);
  }
}

/**
 * @function mountTransmissionBarChart
 * @brief Mounts the transmission bar chart to the DOM.
 * @returns {void}
 */
export function mountTransmissionBarChart()
{
  let Graph4Container = document.querySelector('#TransmissionBarChart-Graph4');
  if (Graph4Container)
  {
    chartObserver.observe(Graph4Container);
  }
}

/**
 * @function mountBrandPieChart
 * @brief Mounts the brand pie chart to the DOM.
 * @returns {void}
 */
export function mountFinalCarList()
{
  let GraphFinalContainer = document.querySelector('#FinalCarList');
  if (GraphFinalContainer)
  {
    chartObserver.observe(GraphFinalContainer);
  }
}

/**
 * @function mountBrandPieChart
 * @brief Mounts the brand pie chart to the DOM.
 * @returns {void}
 */
export function mountBrandPieChart()
{
  let Graph5Container = document.querySelector('#BrandPieChart-Graph5');
  if (Graph5Container)
  {
    chartObserver.observe(Graph5Container);
  }
}
