import * as d3 from 'd3';
import { isEmpty, debounce } from 'lodash';
import { SankeyDiagram_Overview } from './Graph1.js';
import { LineChart_AgePriceCorrelation } from './Graph2.js';
import { BarChart_MileagePriceCorrelation } from './Graph3.js';
import { BarChart_TransmissionDistribution } from './Graph4.js';
import { finalCarList} from './FinalCars.js';
import { column_from_csv } from './csvReadIn.js';

export let size = { width: 0, height: 0 };

const onResize = (targets) =>
{
  targets.forEach(target =>
  {
    const targetId = target.target.getAttribute('id');
    if (!['Sankey-Graph1', 'LineChart-Graph2', 'BarChart-Graph3', 'TransmissionBarChart-Graph4', 'FinalCarList'].includes(targetId)) return;
    size = { width: target.contentRect.width, height: target.contentRect.height };
    if (isEmpty(size) || !column_from_csv || isEmpty(column_from_csv)) return;
    const graphMap = {
      'Sankey-Graph1': { selector: '#Graph1', redraw: SankeyDiagram_Overview },
      'LineChart-Graph2': { selector: '#Graph2', redraw: LineChart_AgePriceCorrelation },
      'BarChart-Graph3': { selector: '#Graph3', redraw: BarChart_MileagePriceCorrelation },
      'TransmissionBarChart-Graph4': { selector: '#Graph4', redraw: BarChart_TransmissionDistribution },
      'FinalCarList': { selector: '#FinalCarList', redraw: finalCarList },
    };
    d3.select(graphMap[targetId].selector).selectAll('*').remove();
    graphMap[targetId].redraw();
  });
};


export const SankeyDiagram = () => (
  `<div id='Sankey-Graph1'>
        <h3 class="SankeyTitle"> Used Car Market Trend</h3>
        <svg id='Graph1'></svg>
        <i>  <b> Graph 1. </b> Overall View of used car sold situation. </i>
    </div>`
);

export const LineChart = () => (
  `<div id='LineChart-Graph2'>
      <svg id='Graph2'></svg>
      <i>  <b> Graph 2. </b> Relationship between Age and Price. Select the data point on the chart to Continue. </i>
    </div>`
);

export const BarChart = () => (
  `<div id='BarChart-Graph3'>
        <svg id='Graph3'></svg>
        <i>  <b> Graph 3. </b> Relationship between Mileage and Price. </i>
    </div>`
);

export const TransmissionBarChart = () => (
  `<div id='TransmissionBarChart-Graph4'>
    <svg id='Graph4'></svg>
    <i>  <b> Graph 4. </b> Distribution of Transmission Types. </i>
  </div>`
);

export const FinalCarChoices = () => (
  `<div id='FinalCarList'>
    <svg id='Graph_final'></svg>
    <i>  <b> Table 5. </b> Users Final Car Choices List. </i>
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
  let Graph3Container = document.querySelector('#BarChart-Graph3');
  if (Graph3Container)
  {
    chartObserver.observe(Graph3Container);
  }
}

export function mountTransmissionBarChart()
{
  let Graph4Container = document.querySelector('#TransmissionBarChart-Graph4');
  if (Graph4Container)
  {
    chartObserver.observe(Graph4Container);
  }
}

export function mountFinalCarList()
{
  let GraphFinalContainer = document.querySelector('#FinalCarList');
  if (GraphFinalContainer)
  {
    chartObserver.observe(GraphFinalContainer);
  }
}
