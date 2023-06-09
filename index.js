// declare variables
const colorPicker = document.getElementById("color-picker");
const schemeMode = document.getElementById("scheme-mode");
const submitBtn = document.getElementById("submit-btn");
const outputs = document.getElementById("outputs");

let colorSelected;
let schemeSelected;

// GET request for color-scheme API - wrap within function
function getColorScheme() {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorSelected.slice(
      1
    )}&mode=${schemeSelected}&count=5`
  )
    .then((response) => response.json())
    .then((data) => {
      let selectedColorArr = [];
      data.colors.forEach((item) => {
        selectedColorArr.push(item.hex.value);
        console.log(selectedColorArr);
      });
      //   pass through the existing array:
      renderColor(selectedColorArr);
      renderHexValue(selectedColorArr);
    });
}

// Eventlistener

submitBtn.addEventListener("click", function () {
  colorSelected = colorPicker.value;
  schemeSelected = document.querySelector("select").value;
  getColorScheme();
  console.log(colorSelected, schemeSelected);
});

// render colors to the DOM / webpage

function renderColor(color) {
  let colorHtml = "";
  color.forEach(function (sample) {
    colorHtml += `<div data-hex="${sample}" class="render-colors" style="background-color: ${sample}"></div>`;
  });
  document.getElementById("color-outputs").innerHTML = colorHtml;
}

function renderHexValue(color) {
  let hexHtml = "";
  color.forEach(function (sample) {
    hexHtml += `
        <p data-fhex="${sample}" class="render-hex">${sample}</p>
        `;
  });
  document.getElementById("hex-outputs").innerHTML = hexHtml;
}
