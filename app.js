const boxPerRow = 16;
const boxPerCol = 16;
let isDrawing = false;

const gridContainer = document.querySelector(".grid-container");

function paintHandler(e) {
    if (isDrawing) {
        e.target.style.backgroundColor = "green";
    }
}

// Adds box divs into the grid
for (let i = 0; i < boxPerRow; i++) {
    for (let j = 0; j < boxPerCol; j++) {
        const box = document.createElement("div");
        box.addEventListener("mousedown", () => { isDrawing = true; });
        box.addEventListener("mouseup", () => { isDrawing = false; });
        box.addEventListener("mousemove", paintHandler);
        box.classList.add("grid-item");
        gridContainer.appendChild(box);
    }
}