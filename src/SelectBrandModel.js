import { getGraph5Data } from "./Graph4";

export let selectedBrand;
export let selectedModel;

window.onchange = function ()
{
  const BrandModel = getGraph5Data;
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
