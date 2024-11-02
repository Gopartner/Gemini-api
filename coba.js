kamu: Response saved to responses.txt
✔ kamu: cat gemini-ai-table.js
⠏ ...🤖 Gemini Response:
/*
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
* Creates a table element with provided options.
*
* @param {Object} options The options for the table element.
* @param {string} options.id The id of the table element.
* @param {string} options.className The class name of the table element.
* @param {Array<Array<string>>} options.data The data for the table element.
* @param {Array<string>} options.headerRow The header row of the table element.
* @param {boolean} options.showTableNumbers Whether to show table numbers.
* @param {string} options.tableNumberPrefix The prefix for table numbers.
* @param {number} options.tableNumberStart The starting number for table
numbers.
* @param {boolean} options.showColumnNumbers Whether to show column numbers.
* @param {string} options.columnNumbersPrefix The prefix for column numbers.
* @param {number} options.columnNumbersStart The starting number for column
numbers.
* @param {boolean} options.showRowNumbers Whether to show row numbers.
* @param {string} options.rowNumbersPrefix The prefix for row numbers.
* @param {number} options.rowNumbersStart The starting number for row numbers.
* @param {boolean} options.showHeaders Whether to show headers.
* @param {boolean} options.showFooter Whether to show a footer.
* @param {boolean} options.showCaption Whether to show a caption.
* @param {string} options.caption The caption for the table element.
* @param {boolean} options.showPagination Whether to show pagination.
* @param {number} options.paginationPageSize The page size for pagination.
* @param {string} options.paginationCurrent The current page for pagination.
* @param {boolean} options.showSearch Whether to show a search bar.
* @param {string} options.searchPlaceholder The placeholder text for the search
bar.
* @param {string} options.searchQuery The initial search query.
* @param {boolean} options.showSort Whether to show sort icons.
* @param {boolean} options.showFilters Whether to show filters.
* @param {string} options.filtersPlaceholder The placeholder text for the
filters.
* @param {string} options.filtersQuery The initial filters query.
* @param {boolean} options.showExport Whether to show an export button.
* @param {Array<string>} options.exportFormats The formats to export to.
* @param {boolean} options.showPrint Whether to show a print button.
* @param {boolean} options.showCopy Whether to show a copy button.
* @param {boolean} options.showDownload Whether to show a download button.
* @param {boolean} options.showResponsive Whether to make the table responsive.
* @param {boolean} options.showStickyHeaders Whether to make the table headers
sticky.
* @param {boolean} options.showZebraStripes Whether to show zebra stripes.
* @param {string} options.zebraStripesColor The color of the zebra stripes.
* @param {boolean} options.showBorder Whether to show a border.
* @param {string} options.borderColor The color of the border.
* @param {boolean} options.showGrid Whether to show a grid.
* @param {string} options.gridColor The color of the grid.
* @param {string} options.theme The theme of the table element.
* @param {string} options.language The language of the table element.
* @returns {HTMLTableElement} The table element.
*/
export function createTable(options) {
const table = document.createElement('table');
if (options.id) {
table.id = options.id;
}
if (options.className) {
table.className = options.className;
}
if (options.data) {
createTableData(table, options.data);
}
if (options.headerRow) {
createTableHeader(table, options.headerRow);
}
if (options.showTableNumbers) {
createTableNumbers(table, options.tableNumberPrefix, options.tableNumberStart);
}
if (options.showColumnNumbers) {
createColumnNumbers(table, options.columnNumbersPrefix,
options.columnNumbersStart);
}
if (options.showRowNumbers) {
createRowNumbers(table, options.rowNumbersPrefix, options.rowNumbersStart);
}
if (options.showHeaders) {
showHeaders(table);
}
if (options.showFooter) {
showFooter(table);
}
if (options.showCaption) {
showCaption(table, options.caption);
}
if (options.showPagination) {
showPagination(table, options.paginationPageSize, options.paginationCurrent);
}
if (options.showSearch) {
showSearch(table, options.searchPlaceholder, options.searchQuery);
}
if (options.showSort) {
showSort(table);
}
if (options.showFilters) {
showFilters(table, options.filtersPlaceholder, options.filtersQuery);
}
if (options.showExport) {
showExport(table, options.exportFormats);
}
if (options.showPrint) {
showPrint(table);
}
if (options.showCopy) {
showCopy(table);
}
if (options.showDownload) {
showDownload(table);
}
if (options.showResponsive) {
showResponsive(table);
}
if (options.showStickyHeaders) {
showStickyHeaders(table);
}
if (options.showZebraStripes) {
showZebraStripes(table, options.zebraStripesColor);
}
if (options.showBorder) {
showBorder(table, options.borderColor);
}
if (options.showGrid) {
showGrid(table, options.gridColor);
}
if (options.theme) {
setTheme(table, options.theme);
}
if (options.language) {
setLanguage(table, options.language);
}
return table;
}

/**
* Creates the table data.
*
* @param {HTMLTableElement} table The table element.
* @param {Array<Array<string>>} data The data for the table element.
*/
function createTableData(table, data) {
const tbody = document.createElement('tbody');
for (const row of data) {
const tr = document.createElement('tr');
for (const cell of row) {
const td = document.createElement('td');
td.textContent = cell;
tr.appendChild(td);
}
tbody.appendChild(tr);
}
table.appendChild(tbody);
}

/**
* Creates the table header.
*
* @param {HTMLTableElement} table The table element.
* @param {Array<string>} headerRow The header row of the table element.
*/
function createTableHeader(table, headerRow) {
const thead = document.createElement('thead');
const tr = document.createElement('tr');
for (const header of headerRow) {
const th = document.createElement('th');
th.textContent = header;
tr.appendChild(th);
}
thead.appendChild(tr);
table.appendChild(thead);
}

/**
* Creates table numbers.
*
* @param {HTMLTableElement} table The table element.
* @param {string} prefix The prefix for table numbers.
* @param {number} start The starting number for table numbers.
*/
function createTableNumbers(table, prefix, start) {
const thead = table.querySelector('thead');
if (thead) {
const tr = document.createElement('tr');
const th = document.createElement('th');
th.textContent = prefix + start;
tr.appendChild(th);
thead.insertBefore(tr, thead.firstChild);
}
const tbody = table.querySelector('tbody');
if (tbody) {
let i = start + 1;
for (const tr of tbody.querySelectorAll('tr')) {
const td = document.createElement('td');
td.textContent = prefix + i;
tr.insertBefore(td, tr.firstChild);
i++;
}
}
}

/**
* Creates column numbers.
*
* @param {HTMLTableElement} table The table element.
* @param {string} prefix The prefix for column numbers.
* @param {number} start The starting number for column numbers.
*/
function createColumnNumbers(table, prefix, start) {
const thead = table.querySelector('thead');
if (thead) {
const tr = thead.querySelector('tr');
if (tr) {
let i = start;
for (const th of tr.querySelectorAll('th')) {
const td = document.createElement('td');
td.textContent = prefix + i;
tr.insertBefore(td, th);
i++;
}
}
}
}

/**
* Creates row numbers.
*
* @param {HTMLTableElement} table The table element.
* @param {string} prefix The prefix for row numbers.
* @param {number} start The starting number for row numbers.
*/
function createRowNumbers(table, prefix, start) {
const tbody = table.querySelector('tbody');
if (tbody) {
let i = start;
for (const tr of tbody.querySelectorAll('tr')) {
const td = document.createElement('td');
td.textContent = prefix + i;
tr.insertBefore(td, tr.firstChild);
i++;
}
}
}

/**
* Shows headers.
*
* @param {HTMLTableElement} table The table element.
*/
function showHeaders(table) {
const thead = table.querySelector('thead');
if (thead) {
thead.style.display = 'table-header-group';
}
}

/**
* Shows footer.
*
* @param {HTMLTableElement} table The table element.
*/
function showFooter(table) {
const tfoot = document.createElement('tfoot');
table.appendChild(tfoot);
}

/**
* Shows caption.
*
* @param {HTMLTableElement} table The table element.
* @param {string} caption The caption for the table element.
*/
function showCaption(table, caption) {
const captionElement = document.createElement('caption');
captionElement.textContent = caption;
table.appendChild(captionElement);
}

/**
* Shows pagination.
*
* @param {HTMLTableElement} table The table element.
* @param {number} pageSize The page size for pagination.
* @param {string} currentPage The current page for pagination.
*/
function showPagination(table, pageSize, currentPage) {
const pagination = document.createElement('div');
pagination.className = 'pagination';
const previousButton = document.createElement('button');
previousButton.textContent = 'Previous';
const nextButton = document.createElement('button');
nextButton.textContent = 'Next';
pagination.appendChild(previousButton);
pagination.appendChild(nextButton);
table.parentNode.insertBefore(pagination, table.nextSibling);
}

/**
* Shows search.
*
* @param {HTMLTableElement} table The table element.
* @param {string} placeholder The placeholder text for the search bar.
* @param {string} query The initial search query.
*/
function showSearch(table, placeholder, query) {
const search = document.createElement('input');
search.type = 'text';
search.placeholder = placeholder;
search.value = query;
table.parentNode.insertBefore(search, table.nextSibling);
}

/**
* Shows sort.
*
* @param {HTMLTableElement} table The table element.
*/
function showSort(table) {
const thead = table.querySelector('thead');
if (thead) {
const tr = thead.querySelector('tr');
if (tr) {
for (const th of tr.querySelectorAll('th')) {
const sortIcon = document.createElement('i');
sortIcon.className = 'sort-icon';
th.appendChild(sortIcon);
}
}
}
}

/**
* Shows filters.
*
* @param {HTMLTableElement} table The table element.
* @param {string} placeholder The placeholder text for the filters.
* @param {string} query The initial filters query.
*/
function showFilters(table, placeholder, query) {
const filters = document.createElement('input');
filters.type = 'text';
filters.placeholder = placeholder;
filters.value = query;
table.parentNode.insertBefore(filters, table.nextSibling);
}

/**
* Shows export.
*
* @param {HTMLTableElement} table The table element.
* @param {Array<string>} formats The formats to export to.
*/
function showExport(table, formats) {
const exportButton = document.createElement('button');
exportButton.textContent = 'Export';
const exportDropdown = document.createElement('ul');
exportDropdown.className = 'export-dropdown';
for (const format of formats) {
const exportItem = document.createElement('li');
exportItem.textContent = format;
exportDropdown.appendChild(exportItem);
}
exportButton.appendChild(exportDropdown);
table.parentNode.insertBefore(exportButton, table.nextSibling);
}

/**
* Shows print.
*
* @param {HTMLTableElement} table The table element.
*/
function showPrint(table) {
const printButton = document.createElement('button');
printButton.textContent = 'Print';
table.parentNode.insertBefore(printButton, table.nextSibling);
}

/**
* Shows copy.
*
* @param {HTMLTableElement} table The table element.
*/
function showCopy(table) {
const copyButton = document.createElement('button');
copyButton.textContent = 'Copy';
table.parentNode.insertBefore(copyButton, table.nextSibling);
}

/**
* Shows download.
*
* @param {HTMLTableElement} table The table element.
*/
function showDownload(table) {
const downloadButton = document.createElement('button');
downloadButton.textContent = 'Download';
table.parentNode.insertBefore(downloadButton, table.nextSibling);
}

/**
* Shows responsive.
*
* @param {HTMLTableElement} table The table element.
*/
function showResponsive(table) {
table.className += ' responsive';
}

/**
* Shows sticky headers.
*
* @param {HTMLTableElement} table The table element.
*/
function showStickyHeaders(table) {
table.className += ' sticky-headers';
}

/**
* Shows zebra stripes.
*
* @param {HTMLTableElement} table The table element.
* @param {string} color The color of the zebra stripes.
*/
function showZebraStripes(table, color) {
table.className += ' zebra-stripes';
table.style.setProperty('--zebra-stripes-color', color);
}

/**
* Shows border.
*
* @param {HTMLTableElement} table The table element.
* @param {string} color The color of the border.
*/
function showBorder(table, color) {
table.style.border = '1px solid ' + color;
}

/**
* Shows grid.
*
* @param {HTMLTableElement} table The table element.
* @param {string} color The color of the grid.
*/
function showGrid(table, color) {
table.style.borderCollapse = 'separate';
table.style.borderSpacing = '1px';
table.style.setProperty('--grid-color', color);
}

/**
* Sets theme.
*
* @param {HTMLTableElement} table The table element.
* @param {string} theme The theme of the table element.
*/
function setTheme(table, theme) {
table.className += ' ' + theme;
}

/**
* Sets language.
*
* @param {HTMLTableElement} table The table element.
* @param {string} language The language of the table element.
*/
function setLanguage(table, language) {
table.lang = language;
}
