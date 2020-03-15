// MARK: Constants
let number = 8;

// MARK: Page Header
var pageHeader = document.createElement("header");
var title = document.createElement("h1");
title.innerHTML = "Bitmap Generator";
title.classList.add(["mb-4"]);
title.style = "text-align:center;";
pageHeader.appendChild(title);



document.body.appendChild(pageHeader);





// MARK: Page Body
var pageBody = document.createElement("div");
pageBody.id = "pageBody";
pageBody.className = "container";

var table = document.createElement("table");
table.classList.add(["mx-auto"]);
for (let i = 0; i < number; i++) {
    var row = document.createElement("tr");
    for (let j = 0; j < number; j++) {
        var cell = document.createElement("td");
        if (j < number-1) {
            cell.classList.add("innercell");
        }
        // cell.innerHTML = "hello";
        row.appendChild(cell);
    }
    table.appendChild(row);
}
pageBody.appendChild(table);


document.body.appendChild(pageBody);





// MARK: Page Footer
var pageFooter = document.createElement("footer");
var copyright = document.createElement("p");
copyright.innerHTML = "&copy;Rob Hageboeck 2020";
pageFooter.appendChild(copyright);


document.body.appendChild(pageFooter);