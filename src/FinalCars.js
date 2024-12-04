import * as d3 from 'd3';
const carData = [
    { Brand: 'Toyota', Transmission: 'Automatic', 'Engine capacity': '2.0L', Mileage: '50000', Age: '3', Price: '25000' },
    { Brand: 'Honda', Transmission: 'Manual', 'Engine capacity': '1.8L', Mileage: '30000', Age: '2', Price: '22000' },
    { Brand: 'Ford', Transmission: 'Automatic', 'Engine capacity': '2.5L', Mileage: '40000', Age: '4', Price: '28000' },
];

// Create table using D3.js
function createFinalTable(data)
{
    const columns = ['Brand', 'Transmission', 'Engine capacity', 'Mileage', 'Age', 'Price'];

    const table = d3.select('#FinalTable')
        .append('table')
        .attr('class', 'final-table');

    const thead = table.append('thead');
    const tbody = table.append('tbody');

    // Append header row
    thead.append('tr')
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text(d => d);

    // Append data rows
    const rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

    rows.selectAll('td')
        .data(row => columns.map(column => ({ column, value: row[column] })))
        .enter()
        .append('td')
        .text(d => d.value);
}

// Call the function to create the table
createFinalTable(carData);
