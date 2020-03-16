// MARK: Constants
let number = 16;
var currColor = "white";
let supportedColors = ["red","orange","green","blue","lightblue","purple","white"];

function clearGrid() {
    for (let i = 0; i < number; i++) {
        for (let j = 0; j < number; j++) {
            bitmap.rows[i].cells[j].style.background = "white";
        }
    }
}

function clickedBox(i,j) {
    bitmap.rows[i].cells[j].style.background = currColor;
}

// MARK: Page Header
var pageHeader = document.createElement("header");
var title = document.createElement("h1");
title.innerHTML = "Bitmap Generator";
title.classList.add("mb-4");
title.style = "text-align:center;";
pageHeader.appendChild(title);

document.body.appendChild(pageHeader);


// MARK: Page Body
var pageBody = document.createElement("div");
pageBody.id = "pageBody";
pageBody.classList.add("container","mb-4");
pageBody.appendChild(document.createElement("hr"));

// MARK: BITMAP MENU
var menu = document.createElement("div");
menu.classList.add("mx-auto","mb-3");

// GENERAL COLOR BUTTONS
for (let i = 0; i < supportedColors.length; i++) {
    var btn = document.createElement("button");
    btn.innerHTML = supportedColors[i].toUpperCase();
    btn.style.background = supportedColors[i];
    btn.classList.add("menuButton","col-sm-2","mb-2");
    btn.onclick = function() {
        currColor = supportedColors[i];
    }
    if (supportedColors[i] == "white") {
        btn.style.color = "black";
    }
    menu.appendChild(btn);
}
// SPECIAL BUTTONS
var clrbtn = document.createElement("button");
clrbtn.innerHTML = "CLEAR";
clrbtn.onclick = function() {
    clearGrid();
}
clrbtn.classList.add("menuButton","specialButtons","col-md-2");
menu.appendChild(clrbtn);

pageBody.appendChild(menu);



// MARK: BITMAP
var bitmap = document.createElement("table");
bitmap.classList.add("mx-auto");
for (let i = 0; i < number; i++) {
    var row = document.createElement("tr");
    for (let j = 0; j < number; j++) {
        var cell = document.createElement("td");
        if (j < number-1) {
            cell.classList.add("innercell");
        }
        cell.onclick = function () {
            clickedBox(i,j);
        }
        // cell.innerHTML = "hello";
        row.appendChild(cell);
    }
    bitmap.appendChild(row);
}
pageBody.appendChild(bitmap);


document.body.appendChild(pageBody);





// MARK: Page Footer
var pageFooter = document.createElement("footer");
var copyright = document.createElement("p");
copyright.innerHTML = "&copy; Rob Hageboeck 2020";
copyright.style = "text-align:center;"
pageFooter.appendChild(copyright);


document.body.appendChild(pageFooter);