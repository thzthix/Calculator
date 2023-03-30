// TODO: update displaying expression
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
  decimalpointClicked: false,
  negateClicked: false,
  equalClicked: false,
  error: false,
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
  equal: "=",
};
function handleDisplayExperssion() {
  if (currentState.error) {
    disPlayExpression.textContent = "Cannot be divided by zero.";
    return;
  }
  if (!currentState.currentSymbol) {
    disPlayExpression.textContent = `${currentState.calculateNum1}`;
  } else if (!currentState.calculateNum2) {
    disPlayExpression.textContent = `${currentState.calculateNum1}${currentState.currentSymbol}`;
  } else {
    disPlayExpression.textContent = `${currentState.calculateNum1}${currentState.currentSymbol}${currentState.calculateNum2}`;
  }

  if (currentState.equalClicked) {
    disPlayExpression.textContent += buttonValues["equal"];
  }
}
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
function displayNum(num, modify, equal) {
  if (
    displayNumericInput.textContent.length > 0 &&
    displayNumericInput.textContent.charAt(0) === "0" &&
    !currentState.decimalpointClicked
  ) {
    console.log("iti ssatisfied");
    console.log(displayNumericInput.textContent);
    displayNumericInput.textContent =
      displayNumericInput.textContent.substring(1);
  }
  if (!modify && !equal) {
    displayNumericInput.textContent += num;
  } else if (modify || equal) {
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
  currentState.equalClicked = false;
  currentState.decimalpointClicked = false;
  currentState.symbolClicked = true;
  currentState.calculateNum2 = "";
  const clickedSymbol = buttonValues[`${event.target.id}`];

  if (!currentState.numericAfterSymbolClicked) {
    console.log("here!");
    if (currentState.calculateNum1 === "0") {
      currentState.calculateNum1 = displayNumericInput.textContent;
    }
    currentState.currentSymbol = clickedSymbol;
    handleDisplayExperssion();
    return;
  }

  console.log(
    ` calculateNum1: ${currentState.calculateNum1} symbol:${
      buttonValues[event.target.id]
    } calculateNum2:${currentState.calculateNum2}`
  );

  if (currentState.previousSymbol) {
    console.log("me/!!");
    currentState.calculateNum1 = calculateExpression(
      currentState.calculateNum1,
      currentState.calculateNum2,
      currentState.previousSymbol
    );

    currentState.currentSymbol = clickedSymbol;
    currentState.previousSymbol = "";
    currentState.calculateNum2 = "";
    currentState.numericAfterSymbolClicked = false;
    displayNum(currentState.calculateNum1, true, false);
    handleDisplayExperssion();
    return;
  }
  if (currentState.numericAfterSymbolClicked) {
    currentState.calculateNum2 = displayNumericInput.textContent;
    currentState.previousSymbol = currentState.currentSymbol;
    if (currentState.previousSymbol === buttonValues["division"]) {
      currentState.error = true;
      handleDisplayExperssion();
      currentState.calculateNum2 = "";
      currentState.calculateNum1 = "0";
      currentState.previousSymbol = "";
      currentState.currentSymbol = "";
      displayNumericInput.textContent = "";
      currentState.decimalpointClicked = false;
      currentState.equalClicked = false;
      currentState.numericAfterSymbolClicked = false;
      currentState.symbolClicked = false;
      currentState.negateClicked = false;

      return;
    }
    console.log("i clickeddd");
    currentState.calculateNum1 = calculateExpression(
      currentState.calculateNum1,
      currentState.calculateNum2,
      currentState.previousSymbol
    );
    currentState.currentSymbol = clickedSymbol;
    currentState.previousSymbol = "";
    displayNum(currentState.calculateNum1, true, false);
  }
  currentState.numericAfterSymbolClicked = false;
  currentState.calculateNum2 = "";
  handleDisplayExperssion();
}
function handleNumericClicked(event) {
  if (currentState.error) {
    currentState.error = false;
    disPlayExpression.textContent = "";
  }
  currentState.equalClicked = false;
  const clickedNumber = buttonValues[`${event.target.id}`];

  if (event.target.id === "decimalpoint") {
    currentState.symbolClicked = false;
    if (currentState.decimalpointClicked) {
      return;
    } else {
      currentState.decimalpointClicked = true;
    }
  }

  if (currentState.symbolClicked) {
    currentState.negateClicked = false;
    currentState.numericAfterSymbolClicked = true;
    displayNumericInput.textContent = "";
    displayNumericInput.textContent = buttonValues[event.target.id];
    currentState.symbolClicked = false;

    return;
  }
  displayNum(clickedNumber, false, false);
  currentState.symbolClicked = false;
}
function handleModifyNumricClicked(event) {
  currentState.equalClicked = false;

  if (event.target.id === "percent") {
    const percentage = Number(displayNumericInput.textContent) / 100;
    currentState.decimalpointClicked = false;
    const currentNum = currentState.calculateNum1
      ? currentState.calculateNum1
      : 0;
    const result = calculateExpression(currentNum, percentage, "*");
    currentState.calculateNum2 = result;
    displayNum(result, true, false);
    handleDisplayExperssion();
    if (currentState.previousSymbol) {
      currentState.previousSymbol = currentState.currentSymbol;
    } else {
      return;
    }

    currentState.numericAfterSymbolClicked = true; //fix it
    currentState.calculateNum2 = result; // save result to calculateNum1
  } else if (event.target.id === "enter-sign") {
    if (displayNumericInput.textContent === "0") {
      currentState.negateClicked = false;
      return;
    } else if (!currentState.negateClicked) {
      displayNumericInput.textContent =
        buttonValues["enter-sign"] + displayNumericInput.textContent;

      currentState.negateClicked = true;
    } else if (currentState.negateClicked) {
      displayNumericInput.textContent = displayNumericInput.textContent.replace(
        buttonValues["enter-sign"],
        ""
      );
      currentState.negateClicked = false;
    }

    currentState.decimalpointClicked = false;
    console.log(
      `num1:${currentState.calculateNum1},num2:${currentState.calculateNum2}`
    );
  }
}

function displayResult() {
  displayNumericInput.textContent = currentState.calculateNum1.toString();
}
function onClickEqual() {
  currentState.equalClicked = true;
  if (currentState.currentSymbol) {
    currentState.calculateNum2 = currentState.calculateNum2
      ? currentState.calculateNum2
      : displayNumericInput.textContent;
    if (currentState.currentSymbol === buttonValues["division"]) {
      console.log("rttot!!");
      currentState.error = true;
      handleDisplayExperssion();
      currentState.calculateNum2 = "";
      currentState.calculateNum1 = "0";
      currentState.previousSymbol = "";
      currentState.currentSymbol = "";
      displayNumericInput.textContent = "";
      currentState.decimalpointClicked = false;
      currentState.equalClicked = false;
      currentState.numericAfterSymbolClicked = false;
      currentState.symbolClicked = false;
      currentState.negateClicked = false;
      return;
    }
    handleDisplayExperssion();
    currentState.calculateNum1 = calculateExpression(
      currentState.calculateNum1,
      currentState.calculateNum2,
      currentState.currentSymbol
    );
    // currentState.calculateNum2 = "";
  } else {
    handleDisplayExperssion();
    currentState.calculateNum1 = displayNumericInput.textContent;
    handleDisplayExperssion();
  }

  displayNum(currentState.calculateNum1, false, true);

  currentState.numericAfterSymbolClicked = false;
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
displayNum(currentState.calculateNum1, false, false);
