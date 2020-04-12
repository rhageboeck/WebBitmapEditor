// MARK: Image control variables
var X_SQUARES = 16;
var IMG_SIZE = 10*X_SQUARES;
var IMG_ROW_SIZE = 100 * X_SQUARES * 4 * (16/X_SQUARES);
var COL_WIDTH = 40 * (16/X_SQUARES);

// COLOR SUPPORT
var SUPPORTED_COLORS = [["red",255,0,0],["green",0,128,0],["blue",0,0,255],["white",255,255,255]];
var currColor = SUPPORTED_COLORS[3];

function clearGrid() {
    for (let i = 0; i < X_SQUARES; i++) {
        for (let j = 0; j < X_SQUARES; j++) {
            bitmap.rows[i].cells[j].style.background = "white";
        }
    }
    var previewData = canvasContext.createImageData(IMG_SIZE,IMG_SIZE);
    canvasContext.putImageData(previewData,0,0);
}

function clickedBox(i,j) {
    // Update Table
    bitmap.rows[i].cells[j].style.background = currColor[0];

    // Update Preview
    var row = 0;
    var col = 0;
    var previewData = canvasContext.getImageData(0,0,IMG_SIZE,IMG_SIZE);
    for (var index = 0; index < previewData.data.length; index += 4) {
        if (index % IMG_ROW_SIZE == 0 && index > 0) {
            row += 1;
        }
        if (index % COL_WIDTH == 0 && index > 0) {
            col += 1;
            col %= X_SQUARES;
        }
        if (row == i && col == j) {
            previewData.data[index+0] = currColor[1];
            previewData.data[index+1] = currColor[2];
            previewData.data[index+2] = currColor[3];
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
for (let i = 0; i < SUPPORTED_COLORS.length; i++) {
    var btn = document.createElement("button");
    btn.innerHTML = SUPPORTED_COLORS[i][0].toUpperCase();
    btn.style.background = SUPPORTED_COLORS[i][0];
    btn.classList.add("menuButton","col-sm-2","mb-2");
    btn.onclick = function() {
        currColor = SUPPORTED_COLORS[i];
    }
    if (SUPPORTED_COLORS[i][0] == "white") {
        btn.style.color = "black";
    }
    menu.appendChild(btn);
}

// for (var NAME in BUILT_IN_COLORS) {
//     var btn = document.createElement("button");
//     btn.innerHTML = NAME.toUpperCase();
//     btn.style.background = NAME;
//     btn.classList.add("menuButton","col-sm-2","mb-2");
//     btn.onclick = function() {
//         currColor = NAME+"";
//     }
//     if (NAME == "white") {
//         btn.style.color = "black";
//     }
//     menu.appendChild(btn);
// }

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
for (let i = 0; i < X_SQUARES; i++) {
    var row = document.createElement("tr");
    for (let j = 0; j < X_SQUARES; j++) {
        var cell = document.createElement("td");
        if (j < X_SQUARES-1) {
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