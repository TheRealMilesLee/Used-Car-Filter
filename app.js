import * as d3 from "d3";
import
{
  SankeyDiagram, LineChart, BarChart, TransmissionBarChart, BrandPieChart,
  mountSankey, mountLineChart
} from "./src/Diagrams";
import "./style.css";
import './src/SelectBrandModel.js';
import { Graph2_data_cleaning, Step1CarFilter } from "./src/graphDataCleaning";
import { createFilteredTable } from "./src/ChartMaker";
import { LineChart_AgePriceCorrelation } from './src/Graph2.js';
import { BarChart_MileagePriceCorrelation } from './src/Graph3.js';
import { BarChart_TransmissionDistribution } from './src/Graph4.js';
import { PieChart_BrandDistribution } from './src/Graph5.js';
export let budget;
export let getGraph2Data;
document.querySelector("#Header").innerHTML = `
  <header>
    <nav class="navigationbar">
      <ul>
        <li><a href="#MainBody">Home</a></li>
        <li><a href="#SankeyOverview">Overview</a></li>
        <li><a href="#GetStarted">Get Started</a></li>
        <li><a href="#LineChart">Age & Price Trend</a></li>
        <li><a href="#BarChart">Mileage & Price Trend</a></li>
        <li><a href="#TransmissionBarChart">Transmission Distribution</a></li>
        <li><a href="#DropDownBrandModel">Brand & Model</a></li>
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
      <p> Let's start by price range. Our data price ranges from 30000 all the way to the 100k+ </p>
      <p> My budget is under
        <input type="number" id="BudgetInputBox">
        <button id="StartButton">Start Filtering</button>
      </p>
    </div>
    <p id="AfterBudgetPrompt" style="display: none;"> This is what we have so far, scroll to see more </p>
    <div id="FilterTable1" style="display: none;">
      <!-- Create a table to show after filtered data -->
    </div>
  </section>

  <section id="LineChart" style="display: none;">
    <div>
    ${ LineChart() }
      <p id="AfterAgePrompt" style="display: none;"> This is what we have so far, scroll to see more </p>
      <div id="FilterTable2" style="display: none;">
        <!-- Create a table to show after filtered data -->
      </div>
    </div >
  </section >

  <section id="BarChart" style="display: none;">
    <div>
      ${ BarChart() }
      <p id="AfterMileagePrompt" style="display: none;"> This is what we have so far, scroll to see more </p>
      <div id="FilterTable3" style="display: none;">
        <!-- Create a table to show after filtered data -->
      </div>
    </div>
  </section>

  <section id="TransmissionBarChart" style="display: none;">
    <div>
      ${ TransmissionBarChart() }
      <p id="AfterTransmissionPrompt" style="display: none;"> This is what we have so far, scroll to see more </p>
      <div id="FilterTable4" style="display: none;">
        <!-- Create a table to show after filtered data -->
      </div>
    </div>
  </section>

  <section id="DropDownBrandModel" style="display: none;">
    <div>
      <h2> Choose Brand and Model </h2>
      <form id="BrandModel" class="dropdown-container">
        <label for="Brand">Brand:</label>
        <select id="Brand"></select>
        <label for="Model">Model:</label>
        <select id="Model"></select>
        <button id="ConfirmSelection">Submit</button>
      </form>
    </div>
    <div>
      ${ BrandPieChart() }
    </div>
  </section>

  <br>
  <br>
  <br>
  <br>
  <br>

  <section id="FinalCarChoices" style="display: none;">
    <div>
      <h2> Finished! </h2>
      <p> Congratulations! You have finally completed the filtering process. </p>
      <i> Here is the list of car that we think would be a good fit for you. </i>
    </div>
    <div id="FilterTable5" style="display: none;">
      <!-- Create a table to show after filtered data -->
    </div>
    <div>
      <h2> Not happy with the result? Click the button to start over </h2>
      <button id="StartOverButton">Start Over</button>
    </div>
  </section>
`;

mountSankey();

window.addEventListener('load', () =>
{
  let firstLoad = true;
  // Get input button and input box
  const budgetInputBox = document.getElementById("BudgetInputBox");
  const startButton = document.getElementById("StartButton");
  startButton.onclick = () =>
  {
    budget = budgetInputBox.value;
    if (budget < 30000)
    {
      alert("We don't have a car that matches your needs.");
      budgetInputBox.value = "";
      return;
    }
    else
    {
      document.querySelector("#AfterBudgetPrompt").style.display = "block";
      document.querySelector("#FilterTable1").style.display = "block";
      let filteredData = Step1CarFilter();
      // Clear previous table if exists
      const filterTableDiv = document.querySelector("#FilterTable1");
      filterTableDiv.innerHTML = "";
      createFilteredTable(filterTableDiv, filteredData);
      // Scroll to the LineChart section
      document.querySelector("#LineChart").scrollIntoView({ behavior: "smooth" });
      getGraph2Data = Graph2_data_cleaning(budget);
      if (budget && !isNaN(budget))
      {
        document.querySelector("#LineChart").style.display = "block";
        mountLineChart();
      }
    }
    firstLoad = false;
  };


  budgetInputBox.oninput = () =>
  {
    if (budgetInputBox.value === "")
    {
      document.querySelector("#AfterBudgetPrompt").style.display = "none";
      document.querySelector("#FilterTable1").style.display = "none";
      document.querySelector("#LineChart").style.display = "none";
      document.querySelector("#BarChart").style.display = "none";
      document.querySelector("#TransmissionBarChart").style.display = "none";
      document.querySelector("#DropDownBrandModel").style.display = "none";
      document.querySelector("#FinalCarChoices").style.display = "none";
      document.querySelector("#BrandModel").reset();
    }
    if (!firstLoad)
    {
      if (budgetInputBox.value !== budget)
      {
        const graphs = [
          { selector: '#Graph2', redraw: LineChart_AgePriceCorrelation },
          { selector: '#Graph3', redraw: BarChart_MileagePriceCorrelation },
          { selector: '#Graph4', redraw: BarChart_TransmissionDistribution },
          { selector: '#Graph5', redraw: PieChart_BrandDistribution }
        ];
        graphs.forEach(graph =>
        {
          d3.select(graph.selector).selectAll('*').remove();
          graph.redraw();
        });
      }
    };
  };
});
