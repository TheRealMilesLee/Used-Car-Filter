
/**
 * @brief Creates a table element populated with filtered data and appends it to the specified container.
 *
 * @param {HTMLElement} filterTable - The container element where the table will be appended.
 * @param {Array<Object>} filteredData - The array of objects containing the filtered data to be displayed in the table.
 *
 * @details
 * This function dynamically creates a table with a header row and body rows based on the provided filtered data.
 * The table headers are ["Brand", "Model", "Transmission", "city", "Engine capacity", "Mileage", "Age", "Price"].
 * The corresponding keys in the filtered data objects are ["brand", "model", "transmission", "city_sold", "engine_capacity", "mileage", "age", "price"].
 */
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
