function navSmall() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  // Get the modal
var modal = document.getElementById("modalMazeDetails");

// Get the button that opens the modal
var openModalBtn = document.getElementById("mazePropertiesBtn");

// Get the <span> element that closes the modal
var closeModal = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
openModalBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Get the button that generates the maze
let mazeGenerateBtn = document.getElementById("generateMaze");
console.log(mazeGenerateBtn.value);
// When the user clicks the button, make maze
mazeGenerateBtn.addEventListener('click',make_maze);

//Get element by id
function getElId(elId) { return document.getElementById(elId) }

// Make maze
function make_maze() {
  var w = parseInt(getElId('rows').value || 10);
  var h = parseInt(getElId('cols').value || 10);
  if(isNaN(w)===true || isNaN(h)===true){
    getElId("errorMazeGenerate").style.display="block"
    getElId("errorMazeGenerate").innerHTML = "Width and Heigth must be a number!";
  }else{
    getElId("errorMazeGenerate").style.display="none"
  }
}