import { SankeyDiagram, LineChart, ScatterPlot, mountSankey, mountLineChart, mountScatter } from "./src/Diagrams";
import "./style.css";

document.querySelector("#Header").innerHTML = `
  <header>
    <nav class="navigationbar">
      <ul>
        <li><a href="#MainBody">Home</a></li>
        <li><a href="#SankeyOverview">Overview</a></li>
        <li><a href="#GetStarted">Get Started</a></li>
        <li><a href="#LineChart">Age & Price Trend</a></li>
        <li><a href="#ScatterPlot">Mileage & Price Trend</a></li>
      </ul>
    </nav>
  </header>
`;

document.querySelector("#MainBody").innerHTML = `
  <section class="GreetingPage">
    <div>
      <h1>Story on Wheels: A used car filter just for you</h1>
    </div>
  </section>

  <section id="SankeyOverview">
    <div>
       ${ SankeyDiagram() }
    </div>
  </section>

  <section id="GetStarted">
    <div>
      <h2>Get Started</h2>
      <p> Let's start by price range. </p>
      <p> My budget is under
        <input type="number" id="BudgetInputBox">
        <button id="StartButton">Start Filtering</button>
      </p>
    </div>
  </section>
  <section id="LineChart">
    <div>
      <h2>Relationship between Age and Price</h2>
     ${ LineChart() }
    </div>
  </section>
  <section id="ScatterPlot">
    <div>
      <h2>Relationship between Mileage and Price </h2>
      ${ ScatterPlot() }
    </div>
  </section>
`;


mountSankey();
mountLineChart();
mountScatter();
