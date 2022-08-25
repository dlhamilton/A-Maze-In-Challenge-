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

//wall directions for each node
const directions = [ 'n','e','s','w'];

//Methods

//Get element by id
function getElId(elId) {
  return document.getElementById(elId)
}
//get randim number
function intRandNo(x) { return Math.floor(Math.random() * x) }
//Add elements to DOM
Node.prototype.addEl = function (tag, count, txt) {
  for (let i = 0; i < count; i++)
    this.appendChild(creatEl(tag, txt));
}
//Inserts an element before a tag
Node.prototype.insertEl = function(tag) {
  this.insertBefore(creatEl(tag), this.firstChild)
}
//Creates the Elements for DOM
function creatEl(tag, txt) {
  var x = document.createElement(tag);
  if (txt !== undefined) x.innerHTML = txt;
  return x
}
//Add elements to list of an object
NodeList.prototype.mapEls = function (el) {
  for (var i = 0; i < this.length; i++){
    el(this[i]);
  } 
}
//Get Children of an object
Node.prototype.getChild = function(i) { return this.childNodes[i] }
//make class tag for element
Node.prototype.makeClassEl = function(txt) { this.className += ' ' + txt }


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
    tblMaze.childNodes.mapEls(function (theChild) {
       theChild.addEl("th", 1);
      theChild.addEl("td", w, "*");
      theChild.addEl("th", 1);
    });
    tblMaze.insertEl('tr');
    tblMaze.addEl('tr', 1);
    tblMaze.firstChild.addEl('th', w + 2);
    tblMaze.lastChild.addEl('th', w + 2);

    for (var h_loop = 1; h_loop <= h; h_loop++) {
      for (var w_loop = 1; w_loop <= w; w_loop++) {
        tblMaze.getChild(h_loop).getChild(w_loop).neighbors = [
          tblMaze.getChild(h_loop + 1).getChild(w_loop),
          tblMaze.getChild(h_loop).getChild(w_loop+ 1),
          tblMaze.getChild(h_loop).getChild(w_loop - 1),
          tblMaze.getChild(h_loop - 1).getChild(w_loop)
      ];
      console.log(tblMaze.getChild(h_loop).getChild(w_loop)+": "+ tblMaze.getChild(h_loop).getChild(w_loop).neighbors );
      }
    }
    makePath(tblMaze.getChild(intRandNo(h)+1).getChild(intRandNo(w)+1));
   


//     const style = document.createElement('style');
//     let randy = Math.floor(100/w);
//     let nnd = document.getElementsByTagName("td")[0].style.width;
// style.innerHTML = `
//       td {
//         width: ${randy}vw;
//         height: ${randy}vw;
//         background-color:red;
//       }
//     `;
//     document.head.appendChild(style);
  }
}
function makePath(currentCell){
  currentCell.innerHTML = '&nbsp;';
  let wallIndex = randomOrderNumbers([0,1,2,3]);
  for (let side = 0; side < 4; side++) {
    let wallNo = wallIndex[side];
    let currentNeighbor = currentCell.neighbors[wallNo];
console.log(currentCell.neighbors[wallNo]);
console.log(wallNo)
    if (currentNeighbor.textContent != '*') continue;
    currentCell.makeClassEl(directions[wallNo]), currentNeighbor.makeClassEl(directions[3 - wallNo]);
    makePath(currentNeighbor);

  }
}

function randomOrderNumbers(x){
  let newArray = [];
for (let i = x.length; i> 0; i--){
let randNo = Math.floor(Math.random() * x.length);
newArray.push(x[randNo]);
x.splice(randNo,1);
}
console.log(newArray);
return newArray;
}


