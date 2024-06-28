let calcNumber = "";
let count = 0;
let state = false;
let advancedVisible = false;

function Numbers(result) {
    try {
        const operators = ['+', '-', '*', '/', '%', 'mod'];
        const isOperator = operators.includes(result);

        if (isOperator) {
            if (calcNumber !== "" && !calcNumber.slice(-1).match(/[+\-*/%]/)) {
                count++;
                if (result === 'mod') {
                    calcNumber += '%';
                    document.getElementById('calc').innerHTML += `<span id="sym-${count}" style="color:#ff3e39;margin:0 10px">mod</span>`;
                } else if (result === '%') {
                    calcNumber += '/100*';
                    document.getElementById('calc').innerHTML += `<span id="sym-${count}" style="color:#ff3e39;margin:0 10px">%</span>`;
                } else {
                    calcNumber += result;
                    document.getElementById('calc').innerHTML += `<span id="sym-${count}" style="color:#ff3e39;margin:0 10px">${result}</span>`;
                }
                state = false;
            }
        } else {
            if (document.getElementById('calc').innerHTML === '0') {
                document.getElementById('calc').innerHTML = '';
            }
            if (['sin', 'cos', 'tan', 'log', 'sqrt'].includes(result)) {
                calcNumber += `${result}(`;
                document.getElementById('calc').innerHTML += `<span id="sym-${count}" style="color:#ff3e39;margin:0 10px">${result}(</span>`;
            } else if (result === '(') {
                calcNumber += '(';
                document.getElementById('calc').innerHTML += `<span id="sym-${count}" style="color:#ff3e39;margin:0 10px">(</span>`;
            } else if (result === ')') {
                calcNumber += ')';
                document.getElementById('calc').innerHTML += `<span id="sym-${count}" style="color:#ff3e39;margin:0 10px">)</span>`;
            } else if (result === 'pow') {
                calcNumber += '**';
                document.getElementById('calc').innerHTML += `<span id="sym-${count}" style="color:#ff3e39;margin:0 10px">^</span>`;
            } else if (result === 'π') {
                calcNumber += 'Math.PI';
                document.getElementById('calc').innerHTML += `<span id="sym-${count}" style="color:#ff3e39;margin:0 10px">π</span>`;
            } else {
                calcNumber += result;
                document.getElementById('calc').innerHTML += result;
            }
            state = true;
        }
    } catch (e) {
        console.error(e);
    }
}

function updateCalcAndResult(result) {
    try {
        document.getElementById('result').innerHTML = result;
        state = true;
    } catch (e) {
        console.error(e);
    }
}

function clearButton() {
    document.getElementById('calc').innerHTML = "0";
    calcNumber = "";
    document.getElementById('result').innerHTML = 0;
    state = false;
}

document.getElementById('backspace').addEventListener('click', () => {
    const lastChar = calcNumber.slice(-1);
    const lastFive = calcNumber.slice(-5);

    if (['+', '-', '*', '/'].includes(lastChar) || lastFive === "/100*") {
        calcNumber = lastFive === "/100*" ? calcNumber.slice(0, -5) : calcNumber.slice(0, -1);
        document.getElementById(`sym-${count}`).remove();
        count--;
        state = true;
    } else {
        calcNumber = calcNumber.slice(0, -1);
        const calcDisplay = document.getElementById('calc').innerHTML;
        document.getElementById('calc').innerHTML = calcDisplay.slice(0, -1);
    }

    if (!calcNumber) {
        clearButton();
    }
});

function calc() {
    try {
        const evalResult = eval(calcNumber
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/Math.PI/g, 'Math.PI')
        );
        document.getElementById('result').innerHTML = evalResult.toString().length >= 10 ? expo(evalResult, 2) : evalResult;
        document.getElementById('calc').innerHTML = evalResult;
        calcNumber = evalResult;
        state = true;
    } catch (e) {
        console.error(e);
        document.getElementById('result').innerHTML = "Error";
    }
}

function expo(x, f) {
    return Number.parseFloat(x).toExponential(f);
}

document.addEventListener('DOMContentLoaded', () => {
    const advancedKeys = document.querySelectorAll('.key.hidden');
    advancedKeys.forEach(key => {
      key.style.display = 'none';
    });
  });
  
  function toggleAdvanced() {
    const advancedKeys = document.querySelectorAll('.key.hidden');
    advancedKeys.forEach(key => {
      if (key.style.display === 'none' || !key.style.display) {
        key.style.display = 'flex';
      } else {
        key.style.display = 'none';
      }
    });
  
    const mainDiv = document.querySelector('.main');
    if (mainDiv.classList.contains('expanded')) {
      mainDiv.classList.remove('expanded');
    } else {
      mainDiv.classList.add('expanded');
    }
  }
  
