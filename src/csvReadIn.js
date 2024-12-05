/**
 * This file reads in the car_data.csv file and filters out any invalid entries.
 */
import * as d3 from 'd3';

/**
 * Reads car data from a CSV file, filters out invalid rows, and returns an array of car objects.
 * @async
 * @function
 * @name column_from_csv
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of car objects with the following properties:
 * - brand {string}: The brand of the car.
 * - model {string}: The model of the car.
 * - city_sold {string}: The city where the car was sold.
 * - transmission {string}: The type of transmission of the car.
 * - engine_capacity {number}: The engine capacity of the car.
 * - mileage {number}: The mileage of the car.
 * - age {number}: The age of the car.
 * - price {number}: The price of the car.
 *
 * @example
 * column_from_csv.then(data => {
 *   console.log(data);
 * });
 */
export let column_from_csv = await d3.csv('../Resources/car_data.csv', (d) =>
{
  // Filter out rows with any null or invalid values
  if (!d.car_brand || !d.car_model || !d.car_price || d.car_price == 0 ||
    !d.car_city || !d.car_fuel || !d.car_transmission || !d.car_drive ||
    !d.car_mileage || !d.car_country || !d.car_engine_capacity ||
    !d.car_engine_hp || !d.car_age)
  {
    return null;
  }
  return {
    brand: d.car_brand.trim(),
    model: d.car_model.trim(),
    city_sold: d.car_city.trim(),
    transmission: d.car_transmission.trim(),
    engine_capacity: +d.car_engine_capacity, // Convert engine capacity to number
    mileage: +d.car_mileage, // Convert mileage to number
    age: +d.car_age, // Convert age to number
    price: +d.car_price // Convert price to number
  };
}).then(data =>
{
  // Filter out any remaining invalid entries
  return data.filter(d => d);
});

// Sort the data by car_price
column_from_csv.sort((a, b) => a.age - b.age);
