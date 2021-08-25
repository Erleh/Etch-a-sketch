const CANVAS_SIZE = 640;
const HOVER_STATES = ["color", "erase"];
let currentHoverState = HOVER_STATES[0];
let currentColor = "#000";
let currentSize = 0;

function setCanvas(){
    const slider = document.querySelector("#slider-container>.slider");
    removeCanvas();
    createSquareCanvas(slider.value);
}

function updateSliderDisplay(){
    const slider = document.querySelector("#slider-container>.slider");
    const displayValue = document.querySelector("#slider-container>p");
    displayValue.textContent = `${slider.value}x${slider.value}`;
}

function setColor(eventInfo){
    const colorPicker = document.querySelector(".color-picker");
    currentColor = eventInfo.target.value;
    colorPicker.setAttribute("style", `background-color: ${currentColor};`);
}

function onHover(eventInfo){
    let target = eventInfo.target;

    if(currentHoverState == HOVER_STATES[0]){
        target.style.backgroundColor = currentColor;
    }
    else if(currentHoverState == HOVER_STATES[1]){
        target.style.backgroundColor = "hsl(var(--clr-cnvs-100))";
    }
}

function colorMode(){
    currentHoverState = HOVER_STATES[0];
}

function eraseMode(){
    currentHoverState = HOVER_STATES[1];
}

function createSquareCanvas(size = 64){
    currentSize = size;
    const canvas = document.querySelector(".canvas");
    const sizeRem = (CANVAS_SIZE / size)/16;

    for(let x = 0; x < size; x++)
    {
        for(let y = 0; y < size; y++){
            let div = document.createElement("div");
            div.classList.add("pixel");
            div.setAttribute("style", `width: ${sizeRem}rem; height: ${sizeRem}rem;`);
            div.addEventListener("mouseover", onHover);

            canvas.appendChild(div);
        }
    }
}

function removeCanvas(){
    const canvas = document.querySelector(".canvas");
    Array.from(canvas.childNodes).forEach((childNode)=>{
        canvas.removeChild(childNode);
    });
}

function resetPage(){
    removeCanvas();
    createSquareCanvas(currentSize);
}

function setColorPicker(){
    const color = document.querySelector(".color");
    const colorPicker = document.querySelector(".color-picker");
    colorPicker.addEventListener("click", ()=>color.click());
    color.oninput = setColor;
}

function setCanvasSlider(){
    const slider = document.querySelector("#slider-container>.slider");
    const confirm = document.querySelector("#slider-container>.button");
    slider.oninput = updateSliderDisplay;
    confirm.addEventListener("click", setCanvas);
}

function setResetButton(){
    const reset = document.querySelector("#delete-page");
    reset.addEventListener('click', resetPage);
}

function setEraserButton(){
    const eraser = document.querySelector("#eraser");
    eraser.addEventListener('click', eraseMode);
}

function setBrushButton(){
    const brush = document.querySelector("#brush");
    brush.addEventListener('click', colorMode);
}

createSquareCanvas();
setColorPicker();
setCanvasSlider();
setResetButton();
setEraserButton();
setBrushButton();