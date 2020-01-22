(function () {
  "use strict";

  let id = 0;
  const tabela = document.querySelector("#tbody")

  // DEFAULT CANDIDATES 
  let ListInicialDeCandidatos = [
    {
      id: getId(),
      nome: "John",
      area: "FrontEnd",
      genero: "Masculino",
      experiencia: "x anos",
    },
    {
      id: getId(),
      nome: "Fabiana",
      area: "BackEnd",
      genero: "Feminino",
      experiencia: "x anos",
    },
    {
      id: getId(),
      nome: "Ted",
      area: "Content",
      genero: "Masculino",
      experiencia: "Nenhuma",
    },
    {
      id: getId(),
      nome: "Joana",
      area: "FrontEnd",
      genero: "Feminino",
      experiencia: "x anos",
    },
    {
      id: getId(),
      nome: "Joaquim",
      area: "BackEnd",
      genero: "Masculino",
      experiencia: "x anos",
    },
    {
      id: getId(),
      nome: "Felipe",
      area: "Design",
      genero: "Masculino",
      experiencia: "x meses",
    }
  ]

  init(ListInicialDeCandidatos, true);

  // DECLARING VARIABLES
  const searchInput = document.querySelector("#searchFilter"),
    tableBody = document.querySelector(".tableBody"),
    selectArea = document.querySelector("#areaSelector"),
    selectGender = document.querySelector("#genderSelector");

   // CREATING ID 
  function getId() {
    id += 1;
    return id;
  }

  // SETTING DEFAULT VALUE FORMAT
  function getValueOnColumnSanitized(line, column) {
    return tableBody.rows[line].cells[column].innerHTML.toUpperCase().trim();
  }


  // CREATING DEFAULT CANDIDATOS
  function init(candidatos, primeiraVez) {

    const listaNoLocalSorage = JSON.parse(localStorage.getItem("listaDeCandidatos"));
    if (listaNoLocalSorage && primeiraVez) {
      candidatos = listaNoLocalSorage;
      id = listaNoLocalSorage[listaNoLocalSorage.length - 1].id;
    }

    
    let linhas = '';

    candidatos.forEach(candidato => {
      linhas += `
        <tr>
          <th scope="row">${candidato.id}</th>
          <td>${candidato.nome}</td>
          <td>${candidato.area}</td>
          <td>${candidato.genero}</td>
          <td>${candidato.experiencia}</td>
        </tr>`
    });
    tabela.innerHTML = linhas;
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
      j = 0, // cell index a 
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


  // ADDING NEW REGISTER TO CANDIDATES LIST AND HTML 
  const form = document.querySelector('#register')
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    newRegister(e);
  })


  //NEW REGISTER
  const newRegister = (e) => {
    let novoId = getId();
    let novoNome = document.getElementById("nome").value;
    let novoArea = document.getElementById("area").value;
    let novoGenero = document.getElementById("genero").value;
    let novoExperiencia = document.getElementById("experiencia").value;

    const novoCandidato = {
      id: novoId,
      nome: novoNome,
      area: novoArea,
      genero: novoGenero,
      experiencia: novoExperiencia,
    }

    ListInicialDeCandidatos = ListInicialDeCandidatos.concat(novoCandidato);

    let linhas = '';

    linhas = `
        <tr>
          <th scope="row">${novoCandidato.id}</th>
          <td>${novoCandidato.nome}</td>
          <td>${novoCandidato.area}</td>
          <td>${novoCandidato.genero}</td>
          <td>${novoCandidato.experiencia}</td>
        </tr>`
    tabela.innerHTML += linhas;    

    // init(ListInicialDeCandidatos)
    salvarLocalStorage(ListInicialDeCandidatos)

    return true;
  }

  function salvarLocalStorage(listNova) {
    localStorage.setItem("listaDeCandidatos", JSON.stringify(listNova));
  }


})();



