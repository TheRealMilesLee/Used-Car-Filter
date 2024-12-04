export function createFilteredTable(filterTable, filteredData)
{
  // Create a table to show after filtered data
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Create header row
  const headerRow = document.createElement('tr');
  ["Brand", "Model", "Transmission", "city", "Engine capacity", "Mileage", "Age", "Price"].forEach(text =>
  {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Create body rows
  filteredData.forEach(rowData =>
  {
    const row = document.createElement('tr');
    ["brand", "model", "transmission", "city_sold", "engine_capacity", "mileage", "age", "price"].forEach(key =>
    {
      const td = document.createElement('td');
      td.textContent = rowData[key];
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  // Append thead and tbody to table
  table.appendChild(thead);
  table.appendChild(tbody);

  // Append table to FilterTable2 div
  filterTable.appendChild(table);
}
