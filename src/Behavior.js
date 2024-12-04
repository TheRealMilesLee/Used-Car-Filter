/**
 * This file is to monitor all the onClick events and dispatch the corresponding events.
 */
import { Graph2_data_cleaning, Step1CarFilter } from "./graphDataCleaning";
import { createFilteredTable } from "./ChartMaker";
export let budget;
export let getGraph2Data;


window.onload = () =>
{
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
      }
    }
  };

  budgetInputBox.oninput = () =>
  {
    if (budgetInputBox.value === "")
    {
      document.querySelector("#LineChart").style.display = "none";
      document.querySelector("#BarChart").style.display = "none";
      document.querySelector("#TransmissionBarChart").style.display = "none";
    }
  };
};
