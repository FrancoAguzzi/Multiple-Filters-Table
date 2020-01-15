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
    found = false;

  // CREATING FILTER FUNCTIONS
  function areaFilter() {
    // Checks if the selected 'area' is in the 'area' cell
    return (
      tableBody.rows[i].cells[2].innerHTML.toUpperCase() ===
      selectArea.value.toUpperCase()
    );
  }

  function genderFilter() {
    // Checks if the selected 'gender' is in the 'gender' cell
    return (
      tableBody.rows[i].cells[3].innerHTML.toUpperCase() ===
      selectGender.value.toUpperCase()
    );
  }

  function searchFilter() {
    // Checks if user text input is in the cell
    return (
      tableBody.rows[i].cells[j].innerHTML
        .toUpperCase()
        .trim()
        .indexOf(searchInput.value.toUpperCase()) > -1
    );
  }

  // USING ALL FILTERS SIMULTANEOUSLY
  function filterAll() {
    if (
      selectArea.value.toUpperCase() !== "ALL" &&
      selectGender.value.toUpperCase() !== "ALL" // Using 3 filters
    ) {
      for (i; i < tableBody.rows.length; i++) {
        // Iterates on table rows
        temporaryRow = tableBody.rows[i]; // Stores temporary row
        compareTexts: for (j; j < temporaryRow.cells.length; j++) {
          // Iterates on temporary row cells
          if (searchFilter() && genderFilter() && areaFilter()) {
            found = true;
            break compareTexts; // Breaks out of the row (contains all the user searched)
          }
        }
        temporaryRow.style.display = found ? "" : "none"; // if something wasn't found = sets line display to none
        // Reset variables
        found = false;
        j = 0;
      }
      i = 0;
    } else if (
      selectArea.value.toUpperCase() === "ALL" &&
      selectGender.value.toUpperCase() === "ALL" // Using 1 filter (search)
    ) {
      for (i; i < tableBody.rows.length; i++) {
        // Iterates on table rows
        temporaryRow = tableBody.rows[i]; // Stores temporary row
        compareTexts: for (j; j < temporaryRow.cells.length; j++) {
          // Iterates on temporary row cells
          if (searchFilter()) {
            found = true;
            break compareTexts; // Breaks out of the row (already contains input value)
          }
        }
        temporaryRow.style.display = found ? "" : "none"; // if input value not found = sets line display to none
        // Reset variables
        found = false;
        j = 0;
      }
      i = 0;
    } else {
      // Using 2 filters
      for (i; i < tableBody.rows.length; i++) {
        // Iterates on table rows
        temporaryRow = tableBody.rows[i]; // Stores temporary row
        compareTexts: for (j; j < temporaryRow.cells.length; j++) {
          // Iterates on temporary row cells
          if (searchFilter() && (genderFilter() || areaFilter())) {
            found = true;
            break compareTexts; // Breaks out of the row (already contains input value)
          }
        }
        temporaryRow.style.display = found ? "" : "none"; // if something wasn't found = sets line display to none
        // Reset variables
        found = false;
        j = 0;
      }
      i = 0;
    }
  }

  // ADD EVENT LISTENERS
  selectArea.addEventListener("change", filterAll);
  searchInput.addEventListener("keyup", filterAll);
  selectGender.addEventListener("change", filterAll);
})();
