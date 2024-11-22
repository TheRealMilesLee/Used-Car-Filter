import { SankeyDiagram, LineChart, BarChart, mountSankey, mountLineChart, mountScatter } from "./src/Diagrams";
import { Graph2_data_cleaning, Graph3_data_cleaning } from "./src/graphDataCleaning";
import { Step1CarFilter } from "./src/CarFilter";

import "./style.css";

export let budget;
export let getGraph2Data;
export let getGraph3Data;

document.querySelector("#Header").innerHTML = `
  <header>
    <nav class="navigationbar">
      <ul>
        <li><a href="#MainBody">Home</a></li>
        <li><a href="#SankeyOverview">Overview</a></li>
        <li><a href="#GetStarted">Get Started</a></li>
        <li><a href="#LineChart">Age & Price Trend</a></li>
        <li><a href="#BarChart">Mileage & Price Trend</a></li>
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
    <div id="FilterTable1" style="display: none;">
      <!-- Create a table to show after filtered data -->
    </div>
  </section>

  <section id="LineChart" style="display: none;">
  </section>

  <section id="BarChart" style="display: none;">
  </section>
`;
mountSankey();

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
    document.querySelector("#FilterTable1").style.display = "block";
    let filteredData = Step1CarFilter();
    console.log(filteredData);
    // Create a table to show after filtered data
    const table = document.createElement('table'); // 创建表格
    const thead = document.createElement('thead'); // 表头
    const tbody = document.createElement('tbody'); // 表体
    // 创建表头行
    const headerRow = document.createElement('tr');
    ["Brand", "Transmission", "Engine capacity", "Mileage", "Age", "Price"].forEach(text =>
    {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // 创建表体行
    filteredData.forEach(rowData =>
    {
      const row = document.createElement('tr');
      ["brand", "transmission", "engine_capacity", "mileage", "age", "price"].forEach(key =>
      {
        const td = document.createElement('td');
        td.textContent = rowData[key];
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });

    // 将thead和tbody添加到表格
    table.appendChild(thead);
    table.appendChild(tbody);

    // 将表格添加到FilterTable1 div
    document.querySelector("#FilterTable1").appendChild(table);

    getGraph2Data = Graph2_data_cleaning(budget);
    if (budget && !isNaN(budget))
    {
      document.querySelector("#LineChart").style.display = "block";
      document.querySelector("#LineChart").innerHTML = `
      <div>
      ${ LineChart() }
      </div>
    `;
      mountLineChart();
      document.querySelector("#BarChart").style.display = "block";
      getGraph3Data = Graph3_data_cleaning(budget);
      document.querySelector("#BarChart").innerHTML = `
      <div>
      ${ BarChart() }
      </div>
    `;
      mountScatter();

      // Scroll to the LineChart section
      document.querySelector("#LineChart").scrollIntoView({ behavior: "smooth" });
    }
  }
};


budgetInputBox.oninput = () =>
{
  if (budgetInputBox.value === "")
  {
    document.querySelector("#LineChart").style.display = "none";
    document.querySelector("#BarChart").style.display = "none";
  }
};




