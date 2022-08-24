function navSmall() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Get the modal
let modal = document.getElementById("modalMazeDetails");

// Get the button that opens the modal
let openModalBtn = document.getElementById("mazePropertiesBtn");
openModalBtn.addEventListener('click', openModal);

// Get the <span> element that closes the modal
let closeModal = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Get the button that generates the maze
let mazeGenerateBtn = document.getElementById("generateMaze");
console.log(mazeGenerateBtn.value);
// When the user clicks the button, make maze
mazeGenerateBtn.addEventListener('click', make_maze);

//Variables
let tblMaze = getElId('mazeArea');


//Methods

//Get element by id
function getElId(elId) {
  return document.getElementById(elId)
}
//Add elements to DOM
Node.prototype.addEl = function (tag, count, txt) {
  for (let i = 0; i < count; i++)
    this.appendChild(creatEl(tag, txt));
}
//Creates the Elements for DOM
function creatEl(tag, txt) {
  var x = document.createElement(tag);
  if (txt !== undefined) x.innerHTML = txt;
  return x
}

// Make maze
function make_maze() {
  let w = parseInt(getElId('rows').value || 10);
  let h = parseInt(getElId('cols').value || 10);
  if (isNaN(w) === true || isNaN(h) === true) {
    getElId("errorMazeGenerate").style.display = "block";
    getElId("errorMazeGenerate").innerHTML = "Width and Heigth must be a number!";
  } else {
    getElId("errorMazeGenerate").style.display = "none";
    tblMaze.innerHTML = "";
    tblMaze.addEl('tr', h);
  }
}