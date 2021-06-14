class Calculator {
    constructor(previousText, currentText) {
        this.previousText = previousText
        this.currentText = currentText
        this.clear()
    }

    clear() {
        this.current = ''
        this.previous = ''
        this.operation = undefined
    }

    delete() {
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.current === '') return
        if (this.previous !== '') {
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previous)
        const current = parseFloat(this.current)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            case '%':
                computation = prev % current
                break
            default:
                return
        }
        this.current = computation
        this.operation = undefined
        this.previous = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentText.innerText =
            this.getDisplayNumber(this.current)
        if (this.operation != null) {
            this.previousText.innerText =
                `${this.getDisplayNumber(this.previous)} ${this.operation}`
        } else {
            this.previousText.innerText = ''
        }
    }
}

const previousText = document.querySelector('[data-previous]')
const currentText = document.querySelector('[data-current]')
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const DELButton = document.querySelector('[data-DEL]')
const ACButton = document.querySelector('[data-AC]')
const equalsButton = document.querySelector('[data-equals]')

const calculator = new Calculator(previousText, currentText)

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', (button) => {
    calculator.compute()
    calculator.updateDisplay()
})

ACButton.addEventListener('click', (button) => {
    calculator.clear()
    calculator.updateDisplay()
})

DELButton.addEventListener('click', (button) => {
    calculator.delete()
    calculator.updateDisplay()
})