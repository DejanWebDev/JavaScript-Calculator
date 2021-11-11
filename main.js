class Calculator
{
    constructor(previousTextElement, currentTextElement)
    {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }

    clear()
    {
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }

    delete()
    {
        this.current = this.current.toString().slice(0, -1); //deletes the last digit
    }

    appendNumber(number) //adds number to the screen
    {
        if(number === '.' && this.current.includes('.')) return; //prevent from adding "." two times
        this.current = this.current.toString() + number.toString();
    }

    chooseOperation(operation)
    {
        if(this.current === '') return; //can't choose operation if you don't choose a number first
        if(this.previous !== '') //if we have number and operation in previous it will be computed in the upper part of the screen as we stack operations
        {
            this.compute();
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = '';
    }

    compute()
    {
        let computation;
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        if(isNaN(prev) || isNaN(curr)) return; //checking if it is not a number currently or previously, then = doesn't work
        switch(this.operation)
        {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '×':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.current = computation;
        this.operation = undefined;
        this.previous = '';
    }

    updateDisplay()
    {
        this.currentTextElement.innerText = this.current;
        if(this.operation != null)
        {
            this.previousTextElement.innerText = `${this.previous} ${this.operation}`; //we add the main screen content to the upper screen content when operation is clicked so the next number can be displayed on the main screen part
        }
        else
        {
            this.previousTextElement.innerText = '';
        }
    }
}


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");

const calculator = new Calculator(previousTextElement, currentTextElement);
let sound = new Audio("audio/click.mp3");

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();  
        sound.play();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        sound.play();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
    sound.play();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
    sound.play();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
    sound.play();
})