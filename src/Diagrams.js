import * as d3 from 'd3';
import { isEmpty, debounce } from 'lodash';
import { Graph1 } from './Graph1';
import { Graph2 } from './Graph2';
import { Graph3 } from './Graph3';

export let size = { width: 0, height: 0 };

const onResize = (targets) =>
{
  targets.forEach(target =>
  {
    const targetId = target.target.getAttribute('id');
    if (!['Sankey-Graph1', 'LineChart-Graph2', 'ScatterPlot-Graph3'].includes(targetId)) return;
    size = { width: target.contentRect.width, height: target.contentRect.height };
    if (isEmpty(size) || isEmpty(column_from_csv)) return;
    const graphMap = {
      'Sankey-Graph1': {
        selector: '#Graph1',
        redraw: SankeyDiagram
      },
      'LineChart-Graph2': { selector: '#Graph2', redraw: LineChart },
      'ScatterPlot-Graph3': { selector: '#Graph3', redraw: ScatterPlot }
    };
    d3.select(graphMap[targetId].selector).selectAll('*').remove();
    graphMap[targetId].redraw();
  });
};


export const SankeyDiagram = () => (
  `<div id='Sankey-Graph1'>
        <svg id='Graph1'></svg>
        <i>  <b> Graph 1. </b> Overall View of used car sold situation. (Click region and year to learn more)</i>
    </div>`
);

export const LineChart = () => (
  `<div id='LineChart-Graph2'>
        <svg id='Graph2'></svg>
        <i>  <b> Graph 2. </b> Relationship between Age and Price. (Click region and year to learn more)</i>
    </div>`
);

export const ScatterPlot = () => (
  `<div id='ScatterPlot-Graph3'>
        <svg id='Graph3'></svg>
        <i>  <b> Graph 3. </b> Relationship between Mileage and Price. (Click region and year to learn more)</i>
    </div>`
);


const chartObserver = new ResizeObserver(debounce(onResize, 100));

export function mountSankey()
{
  let Graph1Container = document.querySelector('#Sankey-Graph1');
  chartObserver.observe(Graph1Container);
}


export function mountLineChart()
{
  let Graph2Container = document.querySelector('#LineChart-Graph2');
  chartObserver.observe(Graph2Container);
}


export function mountScatter()
{
  let Graph3Container = document.querySelector('#ScatterPlot-Graph3');
  chartObserver.observe(Graph3Container);
}




