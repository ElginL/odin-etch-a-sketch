let boxPerRow = 16;
let boxPerCol = 16;
let isDrawing = false;
let paintColor = "green";
let isRainbow = false;

const gridContainer = document.querySelector(".grid-container");
const resetBtn = document.querySelector(".reset-btn");
const gridSizeSlider = document.querySelector(".grid-size-slider");
const gridMagnitude = document.querySelector(".grid-size-mag");
const paintButtons = Array.from(document.querySelectorAll(".paint-btn")).filter(colorTag => colorTag.textContent !== "Rainbow");
const rainbowPaintBtn = document.getElementById("rainbow-btn");

function paintHandler(e) {
    if (isDrawing) {
        e.target.style.backgroundColor = `${paintColor}`;
    }

    if (isDrawing && isRainbow) {
        const colors = ["red", "orange", "yellow", "green", "indigo", "violet", "blue"];
        const randomInt = Math.floor(Math.random() * (colors.length - 1 + 1) + 1);
        e.target.style.backgroundColor = `${colors[randomInt]}`;
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

function paintHoverHandler(e) {
    e.target.style.backgroundColor = e.target.textContent;
    e.target.style.boxShadow = `2px 2px 10px ${e.target.textContent}`
}

function resetPaint(e) {
    e.target.style.backgroundColor = "white";
    e.target.style.boxShadow = "none";
}

function changeColorHandler(e) {
    paintColor = e.target.textContent;
    isRainbow = false;

    // Make color change permanent
}

resetBtn.addEventListener("click", resetHandler);

gridSizeSlider.addEventListener("input", gridSizeHandler);

paintButtons.forEach(paintBtn => {
    paintBtn.addEventListener("mouseover", paintHoverHandler);
    paintBtn.addEventListener("mouseleave", resetPaint);
    paintBtn.addEventListener("click", changeColorHandler);
});

rainbowPaintBtn.addEventListener("click", () => { isRainbow = true });

generateGrid();