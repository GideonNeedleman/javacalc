var operand = null;
var oldOp = null;

function inputNum(val) {
  const length = lowerDisplay.value.length;
  console.log('length =', length);
  if (length !== 12) {
    lowerDisplay.value += val;
  }
}

function inputDec() {
  const length = lowerDisplay.value.length;
  console.log('length =', length);
  if (length !== 12 && Number.isInteger(parseFloat(lowerDisplay.value))) {
    lowerDisplay.value += '.';
  }
  if (length == 0) {
    lowerDisplay.value += '0.';
  }
}

function del() {
  lowerDisplay.value = lowerDisplay.value.slice(0, -1);
}

function allClear() {
  lowerDisplay.value = '';
  upperDisplay.value = '';
  operand = null;
}

function posNeg() {
  if (lowerDisplay.value != '') {
    lowerDisplay.value = -1 * parseFloat(lowerDisplay.value);    
  }
}

function operator(op) {
  if (lowerDisplay.value == '') {
    return;
  }
  if (upperDisplay.value == '') {
    operand = parseFloat(lowerDisplay.value);
    upperDisplay.value = operand + ' ' + op;
    lowerDisplay.value = '';
    oldOp = op;
  } else {
    upperDisplay.value = compute(oldOp);
    operand = parseFloat(upperDisplay.value);
    lowerDisplay.value = '';
    oldOp = op;
  }
}

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

function equals() {
  if (operand === null) {
    return;
  }
  lowerDisplay.value = compute(oldOp);
  upperDisplay.value = '';
  oldOp = null;
  operand = null;
}