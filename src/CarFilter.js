import { column_from_csv } from './csvReadIn.js';
import { budget } from '../app.js';
import { SelectedAge } from './Graph2.js';
import { MileageSelected } from './Graph3.js';

export function Step1CarFilter()
{
  if (budget < 30000)
  {
    alert("We don't have a car that matches your needs.");
    return;
  }
  else
  {
    // Filter out the data that is above the selected budget
    const filteredData = column_from_csv.filter(d => parseInt(d['price']) <= budget && parseInt(d['price']) >= 1000);
    filteredData.sort((a, b) => a.price - b.price);
    // Only return the first 30 entries for performance reasons
    return filteredData.slice(0, 30);
  }
}

export function Step2CarFilter()
{
  let currentData = Step1CarFilter();
  if (SelectedAge)
  {
    // Filter out the data that is above the selected age
    const filteredData = currentData.filter(d => parseInt(d['age']) <= SelectedAge);
    // Only return the first 30 entries for performance reasons
    return filteredData.slice(0, 30);
  }
}

export function Step3CarFilter()
{
  let currentData = Step2CarFilter();
  if (MileageSelected)
  {
    // Filter out the data that is above the selected mileage
    const filteredData = currentData.filter(d => parseInt(d['mileage']) <= MileageSelected);
    // Only return the first 30 entries for performance reasons
    if (filteredData.length === 0)
    {
      alert("We don't have a car that matches your needs. Please try again.");
      return;
    }
    return filteredData.slice(0, 30);
  }
}

