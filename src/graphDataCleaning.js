/**
 * @brief This file is to perform the data cleaning for each graph.
 */
import { column_from_csv } from './csvReadIn.js';
import { budget } from '../app.js';
import { SelectedAge } from './Graph2.js';
import { MileageSelected } from './Graph3.js';
import { TransmissionSelected } from './Graph4.js';


/**
 * @brief Categorizes a car make into a region.
 *
 * This function takes a car make as input and returns the region (Japanese, European, American, Korean, or Other)
 * that the make belongs to. The comparison is case-insensitive.
 *
 * @param {string} make - The car make to categorize.
 * @return {string} The region of the car make.
 */
function categoriesMake(make)
{
  make = make.toLowerCase();

  const carBrands = new Map([
    ['Japanese', ['toyota', 'isuzu', 'honda', 'nissan', 'subaru', 'mazda', 'mitsubishi', 'suzuki', 'daihatsu', 'lexus', 'infiniti', 'acura', 'scion']],
    ['European', ['volkswagen', 'geo', 'rolls-royce', 'fisker', 'audi', 'bmw', 'mercedes-benz', 'porsche', 'volvo', 'saab', 'fiat', 'alfa', 'jaguar', 'land rover', 'mini', 'smart', 'bentley', 'aston martin', 'lotus', 'maserati', 'lamborghini', 'ferrari']],
    ['American', ['ford', 'ram', 'chevrolet', 'dodge', 'jeep', 'chrysler', 'cadillac', 'lincoln', 'buick', 'gmc', 'plymouth', 'saturn', 'pontiac', 'oldsmobile', 'mercury', 'hummer', 'tesla', 'rivian', 'lucid']],
    ['Korean', ['hyundai', 'kia', 'genesis', 'daewoo', 'ssangyong']],
    ['Chinese', ['byd', 'geely', 'great wall', 'chery', 'jac', 'lifan', 'roewe', 'haval', 'dongfeng', 'zotye', 'changan', 'foton', 'brilliance', 'saic', 'haima']],
    ['Indian', ['tata', 'mahindra']],
    ['Russian', ['lada', 'gaz']],
  ]);

  for (const [region, brands] of carBrands.entries())
  {
    if (brands.includes(make)) return region;
  }

  return 'Other';

}


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
    { start: 0, end: 5000, label: '0-5000 RUB' },
    { start: 5001, end: 10000, label: '5001-10000 RUB' },
    { start: 10001, end: 20000, label: '10001-20000 RUB' },
    { start: 20001, end: 30000, label: '20001-30000 RUB' },
    { start: 30001, end: 40000, label: '30001-40000 RUB' },
    { start: 40001, end: 50000, label: '40001-50000 RUB' },
    { start: 50001, end: 60000, label: '50001-60000 RUB' },
    { start: 60001, end: 70000, label: '60001-70000 RUB' },
    { start: 70001, end: 80000, label: '70001-80000 RUB' },
    { start: 80001, end: 90000, label: '80001-90000 RUB' },
    { start: 90001, end: 100000, label: '90001-100000 RUB' },
    { start: 100001, end: 150000, label: '100001-150000 RUB' },
    { start: 150001, end: 200000, label: '150001-200000 RUB' },
    { start: 200001, end: 250000, label: '200001-250000 RUB' },
    { start: 250001, end: 300000, label: '250001-300000 RUB' },
    { start: 300001, end: 350000, label: '300001-350000 RUB' },
    { start: 350001, end: 400000, label: '350001-400000 RUB' },
    { start: 400001, end: 450000, label: '400001-450000 RUB' },
    { start: 450001, end: 500000, label: '450001-500000 RUB' },
    { start: 500001, end: 600000, label: '500001-600000 RUB' },
    { start: 600001, end: 700000, label: '600001-700000 RUB' },
    { start: 700001, end: 800000, label: '700001-800000 RUB' },
    { start: 800001, end: 900000, label: '800001-900000 RUB' },
    { start: 900001, end: 1000000, label: '900001-1000000 RUB' },
    { start: 1000001, end: 1500000, label: '1000001-1500000 RUB' },
    { start: 1500001, end: 2000000, label: '1500001-2000000 RUB' },
    { start: 2000001, end: 2500000, label: '2000001-2500000 RUB' },
    { start: 2500001, end: Infinity, label: '2500000 RUB above' },

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


/**
 *
 * @returns The brand, transmission, engine capacity, mileage, age, and price of the car
 */
export function graph1_data_cleaning()
{
  const uniqueEntries = new Set();
  let cleaned_data = column_from_csv.map(d =>
  {
    const brand = categoriesMake(d['brand']);
    const transmission = d['transmission'];
    const engine_capacity = d['engine_capacity'];
    const mileage = categoriesOdometer(d['mileage']);
    const age = parseInt(d['age']);
    const price = categoriesPrice(d['price']);
    const uniqueKey = `${ brand }-${ price }`;
    if (!uniqueEntries.has(uniqueKey))
    {
      uniqueEntries.add(uniqueKey);
      return {
        brand: brand,
        transmission: transmission,
        engine_capacity: engine_capacity,
        mileage: mileage,
        age: age,
        price: price
      };
    }
    return null;
  }).filter(d => d !== null || d != undefined);  // Filter out null entries

  cleaned_data.sort((a, b) => a.age - b.age);
  return cleaned_data;
}
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
    // Only return the first 60 entries for performance reasons
    return filteredData;
  }
}

/**
 *
 * @returns the age and price of the car
 */
export const Graph2_data_cleaning = () =>
{
  const uniqueEntries = new Set();
  const AfterBudgetData = Step1CarFilter();
  return AfterBudgetData.map(d =>
  {
    const age = parseInt(d['age']);
    const price = parseInt(d['price']);
    const uniqueKey = `${ age }`;
    if (!uniqueEntries.has(uniqueKey))
    {
      uniqueEntries.add(uniqueKey);
      return {
        age: age,
        price: price
      };
    }
    return null;
  }).filter(d => d !== null || d != undefined);  // Filter out null entries
};

export function Step2CarFilter()
{
  let currentData = Step1CarFilter();
  if (SelectedAge)
  {
    // Filter out the data that is above the selected age
    const filteredData = currentData.filter(d => parseInt(d['age']) <= SelectedAge);
    return filteredData;
  }
}

/**
 *
 * @returns the mileage and price of the car
 */
export const Graph3_data_cleaning = () =>
{
  const AfterAgeData = Step2CarFilter();
  const uniqueEntries = new Set();
  let returnValue = AfterAgeData.map(d =>
  {
    const mileage = categoriesOdometer(d['mileage']);
    const price = parseInt(d['price']);
    const uniqueKey = `${ mileage }`;
    if (!uniqueEntries.has(uniqueKey))
    {
      uniqueEntries.add(uniqueKey);
      return {
        mileage: mileage,
        price: price
      };
    }
    return null;
  }).filter(d => d !== null || d != undefined);  // Filter out null entries
  returnValue.sort((a, b) => a.mileage - b.mileage);
  return returnValue;
};

export function Step3CarFilter()
{
  let currentData = Step2CarFilter();
  if (MileageSelected)
  {
    let mileageRange = MileageSelected.split("-");
    let lowBound = parseInt(mileageRange[0]);
    let highBound;
    if (mileageRange[1])
    {
      highBound = parseInt(mileageRange[1]);
    }
    else
    {
      highBound = Infinity;
    }
    if (MileageSelected.includes("+"))
    {
      highBound = Infinity;
    }

    console.log(lowBound, highBound);
    // Filter out the data that is above the selected mileage
    const filteredData = currentData.filter(d => parseInt(d['mileage']) <= highBound && parseInt(d['mileage']) >= lowBound);
    // Only return the first 30 entries for performance reasons
    if (filteredData.length === 0)
    {
      alert("We don't have a car that matches your needs. Please try again.");
      return;
    }
    return filteredData;
  }
}

export const Graph4_data_cleaning = () =>
{
  let MileageSelected_lowBound = parseInt(MileageSelected.split("-")[0]);
  let MileageSelected_highBound = parseInt(MileageSelected.split("-")[1]) || Infinity;
  console.log(MileageSelected_lowBound, MileageSelected_highBound);
  const AfterMileageData = Step3CarFilter();
  let returnValue = AfterMileageData.map(d =>
  {
    return {
      transmission: d['transmission'],
    };
  }).filter(d => d !== null || d != undefined);  // Filter out null entries
  // Count the number of cars in each transmission type
  let transmissionCounts = {};
  returnValue.forEach(d =>
  {
    if (transmissionCounts[d.transmission])
    {
      transmissionCounts[d.transmission]++;
    }
    else
    {
      transmissionCounts[d.transmission] = 1;
    }
  });

  // Convert to key-value pair array
  let transmissionCountsArray = Object.keys(transmissionCounts).map(key =>
  {
    return { transmission: key, count: transmissionCounts[key] };
  });

  return transmissionCountsArray;
};

export function Step4CarFilter()
{
  let currentData = Step3CarFilter();
  if (TransmissionSelected)
  {
    // Filter out the data that is above the selected transmission
    const filteredData = currentData.filter(d => d['transmission'] === TransmissionSelected);
    console.log(filteredData);
    // Only return the first 30 entries for performance reasons
    if (filteredData.length === 0)
    {
      alert("We don't have a car that matches your needs. Please try again.");
      return;
    }
    return filteredData;
  }
}

export const DropDownMenu_data_cleaning = () =>
{
  const AfterTransmissionData = Step4CarFilter();
  let returnValue = AfterTransmissionData.map(d =>
  {
    const brand = d['brand'];
    const model = d['model'];
    const uniqueEntries = new Set();
    const uniqueKey = `${ brand }-${ model }`;
    if (!uniqueEntries.has(uniqueKey))
    {
      return {
        brand: brand,
        model: model
      };
    }
    return null;
  }).filter(d => d !== null || d != undefined);  // Filter out null entries
  return returnValue;
};

export function Step5CarFilter()
{
  let currentData = Step4CarFilter();
  if (TransmissionSelected)
  {
    // Filter out the data that is above the selected transmission
    const filteredData = currentData.filter(d => d['transmission'] === TransmissionSelected);
    console.log(filteredData);
    // Only return the first 30 entries for performance reasons
    if (filteredData.length === 0)
    {
      alert("We don't have a car that matches your needs. Please try again.");
      return;
    }
    return filteredData;
  }
}
