import { Step5CarFilter } from "./graphDataCleaning";
import { getGraph5Data } from "./Graph4";
import { createFilteredTable } from "./ChartMaker";
import "../style.css";

export let selectedBrand;
export let selectedModel;
export let finalData;

export function updateBrandModelDropdown()
{
  const BrandModel = getGraph5Data;
  const DropDownBrand = document.querySelector("#Brand");
  const DropDownModel = document.querySelector("#Model");

  // Clear existing options
  DropDownBrand.innerHTML = "";
  DropDownModel.innerHTML = "";
  DropDownBrand.style.display = "block";
  DropDownModel.style.display = "block";
  // Create a Set to keep track of unique brands
  const uniqueBrands = new Set();
  // Create a Map to keep track of models for each brand
  const brandModelMap = new Map();
  // Populate options
  BrandModel.forEach(item =>
  {
    // Check if the brand is already in the Set
    if (!uniqueBrands.has(item.brand))
    {
      const optionBrand = document.createElement("option");
      optionBrand.value = item.brand;
      optionBrand.text = item.brand;
      DropDownBrand.appendChild(optionBrand);

      // Add the brand to the Set
      uniqueBrands.add(item.brand);
    }

    // Add the model to the corresponding brand in the Map
    if (!brandModelMap.has(item.brand))
    {
      brandModelMap.set(item.brand, new Set());
    }
    brandModelMap.get(item.brand).add(item.model);
  });

  // Update models dropdown based on selected brand
  DropDownBrand.addEventListener("change", () =>
  {
    const selectedBrand = DropDownBrand.value;
    const models = brandModelMap.get(selectedBrand) || new Set();

    // Clear existing options
    DropDownModel.innerHTML = "";

    // Populate model dropdown
    models.forEach(model =>
    {
      const optionModel = document.createElement("option");
      optionModel.value = model;
      optionModel.text = model;
      DropDownModel.appendChild(optionModel);
    });
  });

  // Trigger change event to populate models for the initial brand selection
  DropDownBrand.dispatchEvent(new Event("change"));

  let submitbuttom = document.querySelector("#ConfirmSelection");

  submitbuttom.onclick = () =>
  {
    selectedBrand = DropDownBrand.value;
    selectedModel = DropDownModel.value;
  };

  document.getElementById('BrandModel').addEventListener('submit', function (event)
  {
    event.preventDefault();
    document.querySelector("#FinalCarChoices").style.display = "block";
    document.querySelector("#FilterTable5").style.display = "block";
    finalData = Step5CarFilter();
    console.log(finalData);
    const filterTable5 = document.querySelector("#FilterTable5");
    filterTable5.innerHTML = "";
    createFilteredTable(filterTable5, finalData);
    document.querySelector("#FinalCarChoices").scrollIntoView({ behavior: "smooth" });
  });
}


