// MARK: Constants
let number = 16;
var currColor = "white";
let supportedColors = ["red","green","blue","white"];

function clearGrid() {
    for (let i = 0; i < number; i++) {
        for (let j = 0; j < number; j++) {
            bitmap.rows[i].cells[j].style.background = "white";
        }
    }
    var previewData = canvasContext.createImageData(160,160);
    canvasContext.putImageData(previewData,0,0);
}

function clickedBox(i,j) {
    // Update Table
    bitmap.rows[i].cells[j].style.background = currColor;

    // Update Preview
    var row = 0;
    var col = 0;
    var previewData = canvasContext.getImageData(0,0,160,160);
    for (var index = 0; index < previewData.data.length; index += 4) {
        if (index % 6400 == 0 && index > 0) {
            row += 1;
        }
        if (index % 40 == 0 && index > 0) {
            col += 1;
            col %= 16;
        }
        if (row == i && col == j) {
            previewData.data[index+0] = 0;
            previewData.data[index+1] = 0;
            previewData.data[index+2] = 0;
            previewData.data[index+3] = 255;
        }
    }
    canvasContext.putImageData(previewData,0,0);
}

// MARK: Page Header
// var pageHeader = document.createElement("header");
var title = document.createElement("h1");
title.innerHTML = "Bitmap Generator";
title.classList.add("mb-4");
title.style = "text-align:center;";
// pageHeader.appendChild(title);

// document.body.appendChild(pageHeader);
document.body.appendChild(title);


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

pageBody.appendChild(document.createElement("hr"));

document.body.appendChild(pageBody);

// Image Preview
// Container
var previewContainer = document.createElement("div");
previewContainer.classList.add("container");
previewContainer.style.textAlign = "center";
// Label
var canvasLabel = document.createElement("h2");
canvasLabel.innerHTML = "Preview";
previewContainer.appendChild(canvasLabel);
// Create Canvas
var canvas = document.createElement("canvas");
canvas.style.borderStyle = "solid"
canvas.style.borderColor = "grey";
canvas.style.borderWidth = "1px";
canvas.width = 160;
canvas.height = 160;
var canvasContext = canvas.getContext("2d");
var previewData = canvasContext.createImageData(160,160);
for (var i = 0; i < previewData.data.length; i+= 4) {
    previewData.data[i+0] = 0;
    previewData.data[i+1] = 0;
    previewData.data[i+2] = 0;
    previewData.data[i+3] = 0;
}
canvasContext.putImageData(previewData,0,0);
previewContainer.appendChild(canvas);

document.body.appendChild(previewContainer);

// MARK: Page Footer
// Handled via PHP rendering
// var pageFooter = document.createElement("footer");
// var copyright = document.createElement("p");
// copyright.innerHTML = "&copy; Rob Hageboeck 2020";
// copyright.style = "text-align:center;"
// pageFooter.appendChild(copyright);


// document.body.appendChild(pageFooter);