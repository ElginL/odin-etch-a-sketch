let boxPerRow = 16;
let boxPerCol = 16;
let isDrawing = false;

const gridContainer = document.querySelector(".grid-container");
const resetBtn = document.querySelector(".reset-btn");
const gridSizeSlider = document.querySelector(".grid-size-slider");
const gridMagnitude = document.querySelector(".grid-size-mag");

function paintHandler(e) {
    if (isDrawing) {
        e.target.style.backgroundColor = "green";
    }
}

function resetHandler(e) {
    const boxes = Array.from(document.querySelectorAll(".grid-item"));
    boxes.forEach(box => { box.style.backgroundColor = "white"; });
}

function gridSizeHandler(e) {
    boxPerRow = e.target.value;
    boxPerCol = e.target.value;

    gridMagnitude.textContent = `${boxPerRow} x ${boxPerRow}`;

    // Regenerate Grid
    deleteGrid();
    generateGrid();
}

// Adds box divs into the grid
function generateGrid() {
    gridContainer.style.gridTemplateColumns = `repeat(${boxPerCol}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${boxPerRow}, 1fr)`;
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
}

function deleteGrid() {
    gridContainer.innerHTML = ``;
}

resetBtn.addEventListener("click", resetHandler);

gridSizeSlider.addEventListener("input", gridSizeHandler);

generateGrid();