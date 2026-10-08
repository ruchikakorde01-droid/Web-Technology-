<!DOCTYPE html>
<html>
<head>
    <title>Interactive Calculator</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .calculator {
            width: 300px;
            background-color: #222;
            padding: 20px;
            border-radius: 12px;
        }

        #display {
            width: 100%;
            height: 55px;
            margin-bottom: 15px;
            font-size: 25px;
            text-align: right;
            box-sizing: border-box;
            padding: 10px;
        }

        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
        }

        button {
            height: 55px;
            font-size: 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }

        button:hover {
            background-color: #ccc;
        }

        .operator {
            background-color: #ff9500;
            color: white;
        }

        .equal {
            background-color: #28a745;
            color: white;
        }

        .clear {
            background-color: #dc3545;
            color: white;
        }
    </style>
</head>

<body>

<div class="calculator">
    <input type="text" id="display" value="0" readonly>

    <div class="buttons">
        <button class="clear" data-action="clear">C</button>
        <button data-action="delete">DEL</button>
        <button class="operator" data-value="/">÷</button>
        <button class="operator" data-value="*">×</button>

        <button data-value="7">7</button>
        <button data-value="8">8</button>
        <button data-value="9">9</button>
        <button class="operator" data-value="-">−</button>

        <button data-value="4">4</button>
        <button data-value="5">5</button>
        <button data-value="6">6</button>
        <button class="operator" data-value="+">+</button>

        <button data-value="1">1</button>
        <button data-value="2">2</button>
        <button data-value="3">3</button>
        <button data-value=".">.</button>

        <button data-value="0">0</button>
        <button class="equal" data-action="calculate">=</button>
    </div>
</div>

<script>
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    let expression = "";

    function updateDisplay() {
        display.value = expression || "0";
    }

    function calculate() {
        try {
            if (expression.includes("/0")) {
                display.value = "Cannot divide by 0";
                expression = "";
                return;
            }

            expression = String(eval(expression));
            updateDisplay();

        } catch (error) {
            display.value = "Error";
            expression = "";
        }
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {

            const value = button.dataset.value;
            const action = button.dataset.action;

            if (action === "clear") {
                expression = "";
                updateDisplay();
            }

            else if (action === "delete") {
                expression = expression.slice(0, -1);
                updateDisplay();
            }

            else if (action === "calculate") {
                calculate();
            }

            else if (value) {
                expression += value;
                updateDisplay();
            }
        });
    });

    // Keyboard event handling
    document.addEventListener("keydown", (event) => {

        if ("0123456789.+-*/".includes(event.key)) {
            expression += event.key;
            updateDisplay();
        }

        else if (event.key === "Enter") {
            calculate();
        }

        else if (event.key === "Backspace") {
            expression = expression.slice(0, -1);
            updateDisplay();
        }

        else if (event.key === "Escape") {
            expression = "";
            updateDisplay();
        }
    });
</script>

</body>
</html>