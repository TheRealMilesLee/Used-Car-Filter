import { SankeyDiagram, LineChart, ScatterPlot, mountSankey, mountLineChart, mountScatter } from "./src/Diagrams";
import "./style.css";

document.querySelector("#MainBody").innerHTML = `
  <section class="GreetingPage">
    <div>
      <h1>Story on Wheels: A used car filter just for you</h1>
    </div>
  </section>

  <section class="SankeyOverview">
    <div>
      <h2> Used Car Market Correlation</h2>
      ${ SankeyDiagram() }
    </div>
  </section>

  <section class="GetStarted">
    <div>
      <h2>Get Started</h2>
      <p> Let's start by price range. </p>
      <p> My budget is under
        <input type="number"
               id="BudgetInputBpx"
               min="0"
               max="100"
               step="any">
        <button>Start Filtering</button>
      </p>
    </div>
  </section>
  <section class="LineChart">
    <div>
      <h2>Relationship between Age and Price</h2>
      ${ LineChart() }
    </div>
  </section>
  <section class="ScatterPlot">
    <div>
      <h2>Relationship between Mileage and Price </h2>
      ${ ScatterPlot() }
    </div>
  </section>
`;


mountSankey();
mountLineChart();
mountScatter();
