import * as d3 from 'd3';
import { isEmpty, debounce } from 'lodash';
import { SankeyDiagram_Overview } from './Graph1';
import { LineChart_AgePriceCorrelation } from './Graph2';
import { ScatterPlot_MileagePriceCorrelation } from './Graph3';
import { column_from_csv } from './csvReadIn';

export let size = { width: 0, height: 0 };

const onResize = (targets) =>
{
  targets.forEach(target =>
  {
    const targetId = target.target.getAttribute('id');
    if (!['Sankey-Graph1', 'LineChart-Graph2', 'ScatterPlot-Graph3'].includes(targetId)) return;
    size = { width: target.contentRect.width, height: target.contentRect.height };
    if (isEmpty(size) || !column_from_csv || isEmpty(column_from_csv)) return;
    const graphMap = {
      'Sankey-Graph1': { selector: '#Graph1', redraw: SankeyDiagram_Overview },
      'LineChart-Graph2': { selector: '#Graph2', redraw: LineChart_AgePriceCorrelation },
      'ScatterPlot-Graph3': { selector: '#Graph3', redraw: ScatterPlot_MileagePriceCorrelation }
    };
    d3.select(graphMap[targetId].selector).selectAll('*').remove();
    graphMap[targetId].redraw();
  });
};


export const SankeyDiagram = () => (
  `<div id='Sankey-Graph1'>
        <svg id='Graph1'></svg>
        <i>  <b> Graph 1. </b> Overall View of used car sold situation. </i>
    </div>`
);

export const LineChart = () => (
  `<div id='LineChart-Graph2'>
        <svg id='Graph2'></svg>
        <i>  <b> Graph 2. </b> Relationship between Age and Price.</i>
    </div>`
);

export const ScatterPlot = () => (
  `<div id='ScatterPlot-Graph3'>
        <svg id='Graph3'></svg>
        <i>  <b> Graph 3. </b> Relationship between Mileage and Price. </i>
    </div>`
);


const chartObserver = new ResizeObserver(debounce(onResize, 100));

export function mountSankey()
{
  let Graph1Container = document.querySelector('#Sankey-Graph1');
  if (Graph1Container)
  {
    chartObserver.observe(Graph1Container);
  }
}

export function mountLineChart()
{
  let Graph2Container = document.querySelector('#LineChart-Graph2');
  if (Graph2Container)
  {
    chartObserver.observe(Graph2Container);
  }
}

export function mountScatter()
{
  let Graph3Container = document.querySelector('#ScatterPlot-Graph3');
  if (Graph3Container)
  {
    chartObserver.observe(Graph3Container);
  }
}




