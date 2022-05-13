import { OUTPUT } from './template.js'
import { NODES_SELECTOR_MAP, CALC_BUTTONS, DEFAULT_VALUES } from './model.js'

const NODES_TYPE = Object.freeze({
  simple: 'querySelector',
  multiple: 'querySelectorAll'
})

const getNode = (/** @type {string} */ sel, /** @type {boolean} */ isAll = false) =>  isAll
? Array.from(document[NODES_TYPE.multiple](sel))
  : document[NODES_TYPE.simple](sel)

export const NODES = {}

NODES_SELECTOR_MAP
  .forEach((value, key) => (NODES[key] = getNode(value)))


export const init = () => {
  const calcButtons = OUTPUT + CALC_BUTTONS.map(({ label, attr, className }) => !className ? `<button ${attr}>${label}</button>` : `<button ${attr} class="twice">${label}</button>`).join(' ')

  NODES.calcButtons.innerHTML = calcButtons


  const numberButtons = getNode('[data-number]', true),
    operationButtons = getNode('[data-operation]', true),
    equalsButton = getNode('[data-equals]'),
    deleteButton = getNode('[data-delete]'),
    allClearButton = getNode('[data-all-clear]'),
    previousOperandTextElement = getNode('[data-previous-operand]'),
    currentOperandTextElement = getNode('[data-current-operand]')

  class Calulator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }

    clear() {
      this.currentOperand = DEFAULT_VALUES.currentOperand
      this.previousOperand = DEFAULT_VALUES.previousOperand
      this.operation = DEFAULT_VALUES.operation
    }

    delete() {
      if (this.currentOperand == 0) return
      const sliced = this.currentOperand.toString().slice(0, -1)
      if (sliced === '' || sliced === '0.') {
        this.currentOperand = DEFAULT_VALUES.currentOperand
        return
      }
      this.currentOperand = this.currentOperand
        ? sliced
        : DEFAULT_VALUES.currentOperand
    }

    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
      if (this.currentOperand === DEFAULT_VALUES.currentOperand) return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }

    compute() {
      let computation
      const previous = parseFloat(this.previousOperand),
        current = parseFloat(this.currentOperand)
      if (isNaN(previous) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = previous + current
          break
        case '-':
          computation = previous - current
          break
        case '*':
          computation = previous * current
          break
        case '÷':
          computation = previous / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = DEFAULT_VALUES.operation
      this.previousOperand = DEFAULT_VALUES.previousOperand
    }

    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      const integerDisplay = isNaN(integerDigits)
        ? ''
        : integerDigits.toLocaleString('en', {
          maximumFractionDigits: 0
        })
      return decimalDigits != null
        ? `${integerDisplay}.${decimalDigits}`
        : integerDisplay
    }

    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
      this.previousOperandTextElement.innerText = this.operation != null
        ? `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        : ''
    }
  }

  const calulator = new Calulator(previousOperandTextElement, currentOperandTextElement)

  numberButtons.forEach((button) => button.addEventListener('click', () => {
    calulator.appendNumber(button.innerText)
    calulator.updateDisplay()
  }))

  operationButtons.forEach((button) => button.addEventListener('click', () => {
    calulator.chooseOperation(button.innerText)
    calulator.updateDisplay()
  }))

  equalsButton.addEventListener('click', () => {
    calulator.compute()
    calulator.updateDisplay()
  })

  allClearButton.addEventListener('click', () => {
    calulator.clear()
    calulator.updateDisplay()
  })

  deleteButton.addEventListener('click', () => {
    calulator.delete()
    calulator.updateDisplay()
  })
}
