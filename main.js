(function() {
  "use strict";

  // DECLARING VARIABLES
  const searchInput = document.querySelector("#searchFilter"),
    tableBody = document.querySelector(".tableBody"),
    selectArea = document.querySelector("#areaSelector"),
    selectGender = document.querySelector("#genderSelector");

  // SETTING DEFAULT VALUE FORMAT
  function getValueOnColumnSanitized(line, column) {
    return tableBody.rows[line].cells[column].innerHTML.toUpperCase().trim();
  }

  // CREATING FILTER FUNCTIONS
  function areaFilter(line, column) {
    // Checks if the selected 'area' is in the 'area' cell
    if (selectArea.value.toUpperCase() === "ALL") return true;
    return (
      getValueOnColumnSanitized(line, column) === selectArea.value.toUpperCase()
    );
  }

  function genderFilter(line, column) {
    // Checks if the selected 'gender' is in the 'gender' cell
    if (selectGender.value.toUpperCase() === "ALL") return true;
    return (
      getValueOnColumnSanitized(line, column) ===
      selectGender.value.toUpperCase()
    );
  }

  function searchFilter(line, column) {
    // Checks if user typed text is in the cell
    return (
      getValueOnColumnSanitized(line, column).indexOf(
        searchInput.value.toUpperCase()
      ) > -1
    );
  }

  // USING ALL FILTERS SIMULTANEOUSLY
  function filterAll() {
    debugger;
    let i = 0, // row index
      j = 0, // cell index
      temporaryRow,
      found = false,
      columnIndexArea = 2, // area column index (used by area select filter)
      columnIndexGender = 3; // gender column index (used by gender select filter)

    for (i; i < tableBody.rows.length; i++) {
      // Iterates on table rows
      let validGender = genderFilter(i, columnIndexGender), // equals true if the row contains the selected 'gender'
        validArea = areaFilter(i, columnIndexArea); // equals true if the row contains the selected 'area'
      temporaryRow = tableBody.rows[i]; // Stores temporary row
      compareTexts: if (validGender && validArea) {
        // Only uses search filter if candidate already respected 'area' and 'gender' filters
        for (j; j < temporaryRow.cells.length; j++) {
          // Iterates on temporary row cells
          if (searchFilter(i, j)) {
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
