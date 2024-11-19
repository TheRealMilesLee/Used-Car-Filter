import { SankeyDiagram, LineChart, ScatterPlot, mountSankey, mountLineChart, mountScatter } from "./src/Diagrams";
import { column_from_csv } from "./src/csvReadIn";
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
  <section id="LineChart" style="display: none;">
    <div>
    </div>
  </section>
  <section id="ScatterPlot" style="display: none;">
    <div>
    </div>
  </section>
`;
mountSankey();

// Get input button and input box
const budgetInputBox = document.getElementById("BudgetInputBox");
const startButton = document.getElementById("StartButton");

startButton.onclick = () =>
{
  const budget = budgetInputBox.value;
  if (budget && !isNaN(budget))
  {
    document.querySelector("#LineChart").style.display = "block";
    document.querySelector("#LineChart").innerHTML = `
      <div>
      ${ LineChart(budget) }
      </div>
    `;
    mountLineChart();
    document.querySelector("#ScatterPlot").style.display = "block";
    document.querySelector("#ScatterPlot").innerHTML = `
      <div>
      ${ ScatterPlot(budget) }
      </div>
    `;
    mountScatter();

    // Scroll to the LineChart section
    document.querySelector("#LineChart").scrollIntoView({ behavior: "smooth" });
  }
};

budgetInputBox.oninput = () =>
{
  if (budgetInputBox.value === "")
  {
    document.querySelector("#LineChart").style.display = "none";
    document.querySelector("#ScatterPlot").style.display = "none";
  }
};
