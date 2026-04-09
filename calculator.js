// selectors of all the elements
const display = document.getElementById("display");
const outputDisplay = document.getElementById("display-output");
const button = document.querySelectorAll(".btn");
const btnoperators = document.querySelectorAll(".btn-operator");

// function to calculate live result
function calculateLive() {
    if (display.value === "") {
        outputDisplay.value = "";
        return;
    }
    const expression = display.value
        .replaceAll("×", "*")
        .replaceAll("−", "-")
        .replaceAll("÷", "/")
        .replace(/(\d+)%/g, "($1/100)")
        .replaceAll("+-", "-")
        .replaceAll("-+", "-")
        .replaceAll("++", "+")
        .replaceAll("--", "+");
    try {
        outputDisplay.value = eval(expression);
    } catch (e) {

    }
}

// event listener for all buttons
button.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerHTML;
        console.log(value);

        if (value === "AC") {
            display.value = "";
            outputDisplay.value = "";
            return;
        }
        else if (value === "+/-") {
            display.value = display.value.replace(/-?\d+\.?\d*$/, (m) => parseFloat(m) < 0 ? Math.abs(m) : `(-${m})`);
            calculateLive();
        }
        else if (value === "⌫") {
            display.value = display.value.slice(0, -1);
            calculateLive();
        }
        else if (value === "=") {
            calculateLive();
            display.value = outputDisplay.value;
            outputDisplay.value = "";

        } else {
           

            let lastchar = display.value.slice(-1);
            let symbol = ["+", "−", "×", "÷", "%"];

            if (symbol.includes(value) && symbol.includes(lastchar)) {
                display.value = display.value.slice(0, -1);
            }

            display.value += value;
            calculateLive();
            display.scrollLeft = display.scrollWidth;
        }
    });
    
});

// keyboard support for a buttons
document.addEventListener("keydown", (e) => {
    let key = e.key;

    // numbers
    if (!isNaN(key)) {
        press(key);
    }

    // operators
    else if (key === "+") press("+");
    else if (key === "-") press("−");
    else if (key === "*") press("×");
    else if (key === "/") {
        e.preventDefault();
        press("÷");
    }

    // decimal
    else if (key === ".") press(".");

    // special
    else if (key === "Enter") press("=");
    else if (key === "Backspace") press("⌫");
    else if (key === "Escape") press("AC");
    else if (key === "%") press("%");
});

//  function to simulate the numberic button with keyboard
function press(value) {
    button.forEach(btn => {
        if (btn.innerHTML.trim() === value) {
            btn.click();
        }
    });
}
