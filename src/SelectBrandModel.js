import { DropDownMenu_data_cleaning } from "./graphDataCleaning.js";

export let selectedBrand;
export let selectedModel;

window.onchange = function ()
{
  const BrandModel = DropDownMenu_data_cleaning();
  const DropDownBrand = document.querySelector("#Brand");
  const DropDownModel = document.querySelector("#Model");

  if (DropDownBrand && DropDownModel)
  {
    for (let i = 0; i < BrandModel.length; i++)
    {
      DropDownBrand.appendChild(new Option(BrandModel[i], BrandModel[i]));
      DropDownModel.appendChild(new Option(BrandModel[i], BrandModel[i]));
    }

    document.querySelector('#BrandModel').onchange = function ()
    {
      selectedBrand = DropDownBrand.options[DropDownBrand.selectedIndex].text;
      selectedModel = DropDownModel.options[DropDownModel.selectedIndex].text;
    };
  }
};
