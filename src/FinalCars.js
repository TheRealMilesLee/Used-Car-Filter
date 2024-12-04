import * as d3 from 'd3';
import { finalData } from './SelectBrandModel.js';
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

export function GenerateFinalCarList()
{
    // Call the function to create the table
    createFinalTable(finalData);
}


