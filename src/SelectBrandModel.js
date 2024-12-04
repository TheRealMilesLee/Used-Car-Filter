import { Step5CarFilter } from "./graphDataCleaning";
import { getGraph5Data } from "./Graph4";
import { GenerateFinalCarList } from "./FinalCars";

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
  // Populate options
  BrandModel.forEach(item =>
  {
    const optionBrand = document.createElement("option");
    optionBrand.value = item.brand;
    optionBrand.text = item.brand;
    DropDownBrand.appendChild(optionBrand);

    const optionModel = document.createElement("option");
    optionModel.value = item.model;
    optionModel.text = item.model;
    DropDownModel.appendChild(optionModel);
  });

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
    document.querySelector(".final-content").style.display = "block";
    document.querySelector("#FinalTable").style.display = "block";
    finalData = Step5CarFilter();
    GenerateFinalCarList();
  });
}


