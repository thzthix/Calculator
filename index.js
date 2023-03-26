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
function calculateExpression(num1, num2, symbol) {
  num1 = Number(num1);
  num2 = Number(num2);
  console.log(`num1:${num1},num2:${num2}`);
  let result;

  switch (symbol) {
    case "+":
      result = (num1 + num2).toString();
      break;
    case "-":
      result = (num1 - num2).toString();
      break;

    case "*":
      result = (num1 * num2).toString();
      break;

    case "/":
      result = (num1 / num2).toString();
      break;

    default:
      console.log(`Sorry, error occurred during calculation`);
  }

  displayResult();
  return result;
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

  console.log(
    ` calculateNum1: ${currentState.calculateNum1} symbol:${
      buttonValues[event.target.id]
    } calculateNum2:${currentState.calculateNum2}`
  );

  if (currentState.calculateNum2) {
    currentState.calculateNum1 = calculateExpression(
      currentState.calculateNum1,
      currentState.calculateNum2,
      currentState.previousSymbol
    );
    currentState.currentSymbol = clickedSymbol;
    currentState.previousSymbol = "";
  }
  if (currentState.numericAfterSymbolClicked) {
    currentState.calculateNum2 = displayNumericInput.textContent;
    currentState.previousSymbol = currentState.currentSymbol;
    console.log("i clickeddd");
    currentState.calculateNum1 = calculateExpression(
      currentState.calculateNum1,
      currentState.calculateNum2,
      currentState.previousSymbol
    );
    currentState.currentSymbol = clickedSymbol;
    currentState.previousSymbol = "";
  }
  currentState.numericAfterSymbolClicked = false;
  currentState.calculateNum2 = "";
}

function handleNumericClicked(event) {
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
    const percentage = Number(currentState.calculateNum1) / 100;
    const num2 = displayNumericInput.textContent;
    console.log(`percentage:${percentage}`);
    currentState.previousSymbol = currentState.currentSymbol;
    currentState.currentSymbol = "*";
    const result = calculateExpression(
      percentage,
      num2,
      currentState.currentSymbol
    );

    currentState.calculateNum2 = result;
    console.log(`result:${result}`);
    displayNum(currentState.calculateNum2, true);

    currentState.currentSymbol = currentState.previousSymbol;
    currentState.numericAfterSymbolClicked = true;

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
  currentState.calculateNum2 = displayNumericInput.textContent;
  if (currentState.numericAfterSymbolClicked) {
    currentState.calculateNum1 = calculateExpression(
      currentState.currentSymbol
    );
    numericAfterSymbolClicked = false;
  }
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
