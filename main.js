(function() {
  "use strict";

  // DECLARING VARIABLES
  const searchInput = document.querySelector("#searchFilter"),
    tableBody = document.querySelector(".tableBody"),
    selectArea = document.querySelector("#areaSelector"),
    selectGender = document.querySelector("#genderSelector");
  let i = 0,
    j = 0,
    temporaryRow,
    found = false,
    columnIndexArea = 2,
    columnIndexGender = 3;

  // SETTING DEFAULT VALUE FORMAT
  function getValueOnColumnSanitized(line, column) {
    return tableBody.rows[line].cells[column].innerHTML.toUpperCase();
  }

  // CREATING FILTER FUNCTIONS
  function areaFilter() {
    // Checks if the selected 'area' is in the 'area' cell
    if (selectArea.value.toUpperCase() === "ALL") return true;
    return (
      getValueOnColumnSanitized(i, columnIndexArea) ===
      selectArea.value.toUpperCase()
    );
  }

  function genderFilter() {
    // Checks if the selected 'gender' is in the 'gender' cell
    if (selectGender.value.toUpperCase() === "ALL") return true;
    return (
      getValueOnColumnSanitized(i, columnIndexGender) ===
      selectGender.value.toUpperCase()
    );
  }

  function searchFilter() {
    // Checks if user typed text is in the cell
    return (
      getValueOnColumnSanitized(i, j).indexOf(searchInput.value.toUpperCase()) >
      -1
    );
  }

  // USING ALL FILTERS SIMULTANEOUSLY
  function filterAll() {
    for (i; i < tableBody.rows.length; i++) {
      // Iterates on table rows
      temporaryRow = tableBody.rows[i]; // Stores temporary row
      compareTexts: if (genderFilter() && areaFilter()) {
        // Only uses search filter if candidate already respected 'area' and 'gender' filters
        for (j; j < temporaryRow.cells.length; j++) {
          // Iterates on temporary row cells
          if (searchFilter()) {
            found = true;
            break compareTexts; // Breaks out of the row (already contains everything the user searched)
          }
        }
      }
      temporaryRow.style.display = found ? "" : "none"; // if something wasn't found = sets line display to none
      // Reset variables
      found = false;
      j = 0;
    }
    i = 0;
  }

  // ADD EVENT LISTENERS
  selectArea.addEventListener("change", filterAll);
  searchInput.addEventListener("keyup", filterAll);
  selectGender.addEventListener("change", filterAll);
})();
