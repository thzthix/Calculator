const calculatorContainer = document.getElementById("calculator-container");
const displayPanel = document.getElementById("display-panel");
const disPlayExpression = document.getElementById("display-expression");
const displayNumericInput = document.getElementById("display-numeric-input");

const allClearButton = document.getElementById("clear-all");
const clearNumericInputButton = document.getElementById("clear-numeric-input");
const equalButton = document.getElementById("equal");
const buttons = document.querySelectorAll("button");

let currentExpression = "";

const currentState = {
  calculateNum1: "0",
  calculateNum2: "",
  currentSymbol: "",
  previousSymbol: "",
  symbolClicked: false,
  numericAfterSymbolClicked: false,
};

const buttonValues = {
  "enter-sign": "-",
  percent: "%",
  division: "/",
  multiply: "*",
  plus: "+",
  subtract: "-",
  decimalpoint: ".",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  zero: "0",
};
function calculateExpression(symbol) {
  num1 = Number(currentState.calculateNum1);
  num2 = Number(currentState.calculateNum2);
  console.log(`num1:${num1},num2:${num2}`);

  switch (symbol) {
    case "+":
      currentState.calculateNum1 = (num1 + num2).toString();

      break;
    case "-":
      currentState.calculateNum1 = (num1 - num2).toString();
      break;
    case "*":
      currentState.calculateNum1 = (num1 * num2).toString();
      break;

    case "/":
      currentState.calculateNum1 = (num1 / num2).toString();
      break;

    default:
      console.log(`Sorry, error occurred during calculation`);
  }
  currentState.calculateNum2 = "";
  displayResult();
}
function displayNum(num, modify) {
  if (!modify) {
    displayNumericInput.textContent += num;
  } else if (modify) {
    displayNumericInput.textContent = num;
  }
}
function storeNumbers() {
  if (currentState.calculateNum1 === "0") {
    currentState.calculateNum1 = displayNumericInput.textContent;
  } else {
    console.log("kldjlskadjs");
    currentState.calculateNum2 = displayNumericInput.textContent;
  }
}
function handleSymbolClicked(event) {
  currentState.symbolClicked = true;
  const clickedSymbol = buttonValues[`${event.target.id}`];
  if (!currentState.numericAfterSymbolClicked) {
    if (currentState.calculateNum1 === "0") {
      currentState.calculateNum1 = displayNumericInput.textContent;
    }
    currentState.currentSymbol = clickedSymbol;
    return;
  }

  //storeNumbers();

  console.log(
    ` calculateNum1: ${currentState.calculateNum1} symbol:${
      buttonValues[event.target.id]
    } calculateNum2:${currentState.calculateNum2}`
  );

  if (currentState.numericAfterSymbolClicked) {
    currentState.calculateNum2 = displayNumericInput.textContent;
    currentState.previousSymbol = currentState.currentSymbol;
    console.log("i clickeddd");
    calculateExpression(currentState.previousSymbol);
    currentState.currentSymbol = clickedSymbol;
    currentState.previousSymbol = "";
  }
  currentState.numericAfterSymbolClicked = false;
}

function handleNumericClicked(event) {
  // symbolClicked = false;
  // if (calculateNum1 && symbolClicked && !numericAfterSymbolClicked) {
  //   displayNumericInput.textContent = "";
  //   displayNumericInput.textContent = buttonValues[event.target.id];
  //   numericAfterSymbolClicked = true;
  //   return;
  // }
  // numericAfterSymbolClicked = true;
  // displayNum(buttonValues[event.target.id], false);
  const clickedNumber = buttonValues[`${event.target.id}`];
  if (currentState.symbolClicked) {
    currentState.numericAfterSymbolClicked = true;
    displayNumericInput.textContent = "";
    displayNumericInput.textContent = buttonValues[event.target.id];
    currentState.symbolClicked = false;
    return;
  }
  displayNum(clickedNumber, false);
  currentState.symbolClicked = false;
}

function handleModifyNumricClicked(event) {
  if (event.target.id === "percent") {
    displayNum(
      (Number(displayNumericInput.textContent) / 100).toString(),
      true
    );
    storeNumbers();
  } else if (event.target.id === "enter-sign") {
    displayNum((Number(displayNumericInput.textContent) * -1).toString(), true);
    storeNumbers();
  }
}

function displayResult() {
  displayNumericInput.textContent = currentState.calculateNum1.toString();
}
function onClickEqual() {
  // if (!symbolClicked) {
  //   calculateNum1 = displayNumericInput.textContent;
  //   displayResult();
  //   console.log(`clicked equl:${calculateNum1}`);
  //   // calculateNum1 = 0;
  //   return;
  // }
  calculateExpression();
}
equalButton.addEventListener("click", onClickEqual);
function resetDisplayPanel(event) {
  if (event.target.id === "clear-all") {
    disPlayExpression.textContent = "";
  }
  displayNumericInput.textContent = "";
  calculateNum1 = "";
  calculateNum2 = "";
  currentSymbol = "";
  symbolClicked = false;
}
allClearButton.addEventListener("click", resetDisplayPanel);
clearNumericInputButton.addEventListener("click", resetDisplayPanel);

const numericButtons = document.getElementsByClassName("numeric-input");
Array.prototype.forEach.call(numericButtons, (button) => {
  button.addEventListener("click", handleNumericClicked);
});

const symbolButtons = document.getElementsByClassName("symbols");
Array.prototype.forEach.call(symbolButtons, (button) => {
  button.addEventListener("click", handleSymbolClicked);
});

const modifyNumericButtons = document.getElementsByClassName("modify");
Array.prototype.forEach.call(modifyNumericButtons, (button) => {
  button.addEventListener("click", handleModifyNumricClicked);
});
