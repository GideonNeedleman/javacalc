// initialize operand and oldOperator global variables, set max display length
var operand = null;
var oldOp = null;
const max = 12;

// inputs pressed digit into lower display, up to a max length. Also allows for negative sign in max length digit restriction
function inputNum(val) {
  const length = lowerDisplay.value.length;
  console.log('length =', length);
  if (length < max) {
    lowerDisplay.value += val;
  } else if (lowerDisplay.value < 0 && length < max + 1) {
    lowerDisplay.value += val;
  }
  navigator.vibrate(200);
}

// inputs decimal point. Checks that it will fit within max length. Checks there is not already a decimal point. If lower display is empty, then also adds a leading zero before the decimal point.
function inputDec() {
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
  lowerDisplay.value = lowerDisplay.value.slice(0, -1);
}

// clears both displays and resets operand and oldOperator variables
function allClear() {
  lowerDisplay.value = '';
  upperDisplay.value = '';
  operand = null;
  oldOp = null;
}

// toggles positive or negative value in lower display
function posNeg() {
  if (lowerDisplay.value != '') {
    lowerDisplay.value = -1 * parseFloat(lowerDisplay.value);    
  }
}

// when an operator button is pressed, several things may happen. If lower display is empty, then nothing happens. If upper display is empty then it displays entered number in upper display with operator. If upper display already had an operand and operator, then it performs the calculation and puts the result and new operator in the upper display.
function operator(op) {
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