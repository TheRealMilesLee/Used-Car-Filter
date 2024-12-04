import { DropDownMenu_data_cleaning } from "./graphDataCleaning.js";

export let selectedBrand;
export let selectedModel;

export const DropDownMenu = () =>
{
  document.querySelector("#BrandModel").innerHTML = `
    <div class="dropdown-Brand-Model">
      <select name="Brand" id="Brand">
      </select>
      <p> With the model of </p>
      <select name="Model" id="Model">
      </select>
    </div>
  `;
};

if (document.querySelector("#BrandModel") !== null)
{
  const BrandModel = DropDownMenu_data_cleaning();
  const DropDownBrand = document.querySelector("#Brand");
  for (let i = 0; i < BrandModel.length; i++)
  {
    DropDownBrand.appendChild(new Option(BrandModel[i], BrandModel[i]));
  }
  const DropDownModel = document.querySelector("#Model");
  for (let i = 0; i < BrandModel.length; i++)
  {
    DropDownModel.appendChild(new Option(BrandModel[i], BrandModel[i]));
  }

  document.querySelector('#BrandModel').onchange = function ()
  {
    selectedBrand = DropDownBrand.options[DropDownBrand.selectedIndex].text;
    selectedModel = DropDownModel.options[DropDownModel.selectedIndex].text;
  };
}
