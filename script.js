// initialize operand and oldOperator global variables, set max display length
var operand = null;
var oldOp = null;
const max = 12;

// inputs pressed digit into lower display, up to a max length. Also allows for negative sign in max length digit restriction
function inputNum(val) {
  navigator.vibrate(50);
  const length = lowerDisplay.value.length;
  console.log('length =', length);
  if (length < max) {
    lowerDisplay.value += val;
  } else if (lowerDisplay.value < 0 && length < max + 1) {
    lowerDisplay.value += val;
  }
}

// inputs decimal point. Checks that it will fit within max length. Checks there is not already a decimal point. If lower display is empty, then also adds a leading zero before the decimal point.
function inputDec() {
  navigator.vibrate(50);
  const length = lowerDisplay.value.length;
  console.log('length =', length);
  if (length !== max && Number.isInteger(parseFloat(lowerDisplay.value))) {
    lowerDisplay.value += '.';
  }
  if (length == 0) {
    lowerDisplay.value += '0.';
  }
}

// deletes rightmost character
function del() {
  navigator.vibrate(50);
  lowerDisplay.value = lowerDisplay.value.slice(0, -1);
}

// clears lower display
function ce() {
  navigator.vibrate(50);
  lowerDisplay.value='';
}

// clears both displays and resets operand and oldOperator variables
function allClear() {
  navigator.vibrate(50);
  lowerDisplay.value = '';
  upperDisplay.value = '';
  operand = null;
  oldOp = null;
}

// toggles positive or negative value in lower display
function posNeg() {
  navigator.vibrate(50);
  if (lowerDisplay.value != '') {
    lowerDisplay.value = -1 * parseFloat(lowerDisplay.value);    
  }
}

// when an operator button is pressed, several things may happen. If lower display is empty, then nothing happens. If upper display is empty then it displays entered number in upper display with operator. If upper display already had an operand and operator, then it performs the calculation and puts the result and new operator in the upper display.
function operator(op) {
  navigator.vibrate(50);
  if (lowerDisplay.value == '') {
    return;
  }
  if (upperDisplay.value == '') {
    operand = parseFloat(lowerDisplay.value);
  } else {
    upperDisplay.value = compute(oldOp);
    operand = parseFloat(upperDisplay.value);
  }
  upperDisplay.value = operand + ' ' + op;
  lowerDisplay.value = '';
  oldOp = op;
}

// returns value of operation
function compute(op) {
  switch (op) {
    case '+':
      return operand + parseFloat(lowerDisplay.value);
    case '-':
      return operand - parseFloat(lowerDisplay.value);
    case '/':
      return operand / parseFloat(lowerDisplay.value);
    case 'x':
      return operand * parseFloat(lowerDisplay.value);
  }
}

// performs calculation and displays result in lower display. If no operand was selected or if no second operand was input then it does nothing.
function equals() {
  navigator.vibrate(50);
  if (operand === null || lowerDisplay.value === '') {
    return;
  }
  let result = compute(oldOp);
  // simply doing lowerDisplay.value = result
  // can have display issues if the result is > max digits long. ex: 2/3 or multiplying large numbers. Solution is for long numbers to either truncate them to 11 digits or convert to scientific notation. 
  // No need to do this when computing result when pressing operator button (chaining operations) because upper display is much longer.
  if (result.toString().length > max) {
    if (result > 10000000000) {
      lowerDisplay.value = result.toExponential(5);
    } else {
      lowerDisplay.value = result.toString().slice(0,11);
    }
  } else {
    lowerDisplay.value = result;
  }
  upperDisplay.value = '';
  oldOp = null;
  operand = null;
}

window.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("btn-del").addEventListener("click", del);
  document.getElementById("btn-ce").addEventListener("click", ce);
  document.getElementById("btn-ac").addEventListener("click", allClear);
  document.getElementById("btn-div").addEventListener("click", function() { operator('/'); });
  document.getElementById("btn-7").addEventListener("click", function() { inputNum(7); });
  document.getElementById("btn-8").addEventListener("click", function() { inputNum(8); });
  document.getElementById("btn-9").addEventListener("click", function() { inputNum(9); });
  document.getElementById("btn-mul").addEventListener("click", function() { operator('x'); });
  document.getElementById("btn-4").addEventListener("click", function() { inputNum(4); });
  document.getElementById("btn-5").addEventListener("click", function() { inputNum(5); });
  document.getElementById("btn-6").addEventListener("click", function() { inputNum(6); });
  document.getElementById("btn-min").addEventListener("click", function() { operator('-'); });
  document.getElementById("btn-1").addEventListener("click", function() { inputNum(1); });
  document.getElementById("btn-2").addEventListener("click", function() { inputNum(2); });
  document.getElementById("btn-3").addEventListener("click", function() { inputNum(3); });
  document.getElementById("btn-add").addEventListener("click", function() { operator('+'); });
  document.getElementById("btn-neg").addEventListener("click", posNeg);
  document.getElementById("btn-0").addEventListener("click", function() { inputNum(0); });
  document.getElementById("btn-dec").addEventListener("click", inputDec);
  document.getElementById("btn-eq").addEventListener("click", equals);
});