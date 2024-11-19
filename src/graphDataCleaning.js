/**
 * @brief This file is to perform the data cleaning for each graph.
 */
import * as d3 from 'd3';
import { column_from_csv } from './csvReadIn.js';

/**
 * Categorizes the given odometer reading into predefined mileage ranges.
 *
 * @param {string|number} odometer - The odometer reading to categorize. Can be a string or number.
 * @returns {string} The label of the mileage range that the odometer reading falls into, or 'Unknown' if the input is invalid.
 */
function categoriesOdometer(odometer)
{
  // Odometer categories
  const odometerRanges = [
    { label: `0-1000 miles`, start: 0, end: 1000 },
    { label: `1000-5000 miles`, start: 1000, end: 5000 },
    { label: `5000-10000 miles`, start: 5000, end: 10000 },
    { label: `10000-50000 miles`, start: 10000, end: 50000 },
    { label: `50000-100000 miles`, start: 50000, end: 100000 },
    { label: `100000-120000 miles`, start: 100000, end: 120000 },
    { label: `120000-160000 miles`, start: 120000, end: 160000 },
    { label: `160000-180000 miles`, start: 160000, end: 180000 },
    { label: `180000-200000 miles`, start: 180000, end: 200000 },
    { label: `200000+ miles`, start: 200000, end: Infinity }
  ];

  if (!odometer) return 'Unknown';
  // Make odometer into the ranges
  const odometerNum = parseInt(odometer);
  if (isNaN(odometerNum))
  {
    return 'Unknown';
  }
  else
  {
    for (const range of odometerRanges)
    {
      if (odometerNum >= range.start && odometerNum <= range.end)
      {
        return range.label;
      }
    }
  }
}

/**
 * Categorizes a given price into predefined price ranges.
 *
 * @param {string|number} price - The price to categorize. Can be a string or number.
 * @returns {string} The label of the price range the given price falls into, or 'Unknown' if the price is invalid.
 */
function categoriesPrice(price)
{
  const priceRanges = [
    { start: 0, end: 1000, label: '$0-$1000' },
    { start: 1001, end: 5000, label: '$1001-$5000' },
    { start: 5001, end: 10000, label: '$5001-$10000' },
    { start: 10001, end: 20000, label: '$10001-$20000' },
    { start: 20001, end: 30000, label: '$20001-$30000' },
    { start: 30001, end: 40000, label: '$30001-$40000' },
    { start: 40001, end: 50000, label: '$40001-$50000' },
    { start: 50001, end: 60000, label: '$50001-$60000' },
  ];

  if (!price) return 'Unknown';
  const priceNum = parseInt(price);
  if (isNaN(priceNum))
  {
    return 'Unknown';
  }
  else
  {
    for (const range of priceRanges)
    {
      if (priceNum >= range.start && priceNum <= range.end)
      {
        return range.label;
      }
    }
  }
}

export function graph1_data_cleaning()
{
  const uniqueEntries = new Set();
  return column_from_csv.map(d =>
  {
    const brand = d['brand'];
    const model = d['model'];
    const transmission = d['transmission'];
    const engine_capacity = d['engine_capacity'];
    const mileage = categoriesOdometer(d['mileage']);
    const age = d['age'];
    const price = categoriesPrice(d['price']);
    const uniqueKey = `${ brand }-${ model }-${ transmission }-${ engine_capacity }-${ mileage }-${ age }-${ price }`;
    if (!uniqueEntries.has(uniqueKey))
    {
      uniqueEntries.add(uniqueKey);
      return {
        brand: brand,
        model: model,
        transmission: transmission,
        engine_capacity: engine_capacity,
        mileage: mileage,
        age: age,
        price: price
      };
    }
    return null;
  }).filter(d => d !== null);  // Filter out null entries
}

export const Graph2_data_cleaning = () =>
{
};

export const Graph3_data_cleaning = () =>
{
};
