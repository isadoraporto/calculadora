const display = document.getElementById("display");
const buttons = document.querySelector(".botoes");

let currentValue = "";
let lastValue = "";
let justCalculated = false;

function updateDisplay(value) {
  display.value = value || "0";
}

function adicionar(valor) {
  if (justCalculated) {
    currentValue = "";
    justCalculated = false;
  }
  currentValue += valor;
  updateDisplay(currentValue);
}

function limpar() {
  currentValue = "";
  lastValue = "";
  justCalculated = false;
  updateDisplay(currentValue);
}

function calcular() {
  try {
    currentValue = eval(lastValue + currentValue).toString();
    lastValue = "";
    justCalculated = true;
    updateDisplay(currentValue);
  } catch {
    updateDisplay("Erro");
    limpar();
  }
}

function appendOperator(operator) {
  if (!currentValue && !lastValue) return;

  if (justCalculated) {
    lastValue = currentValue;
    currentValue = "";
    justCalculated = false;
  }

  if (/[+\-*/]$/.test(lastValue)) {
    lastValue = lastValue.slice(0, -1);
  }

  lastValue += currentValue + operator;
  currentValue = "";
  updateDisplay(lastValue);
  try {
    result= eval(lastValue.replace(/\%/g, "/"))
    if( result === infinity || Number.isNan (result)) {
        result=" erro";
    }
    else{
        result = Number( result.toFixed(12)).toString ()
    }
  } catch{
    result=" Erro"
  }
  updateDisplay(result);
  currentValue= result ==="erro" ? "" : result;
  lastValue="";
  justCalculated= true;
}

updateDisplay(currentValue);