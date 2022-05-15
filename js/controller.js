import { OUTPUT } from './template.js'
import {
  NODES, OPERATIONS, CALC_BUTTONS, DEFAULT_VALUES,
  getButtonsFromSelector
} from './model.js'


export const init = () => {
  const calcButtons = OUTPUT + CALC_BUTTONS().map(({ label, attr, className }) => !className ? `<button ${attr}>${label}</button>` : `<button ${attr} class="twice">${label}</button>`).join(' ')

  NODES.calcButtons.innerHTML = calcButtons

  const numberButtons = getButtonsFromSelector().numberButtons
  const operationButtons = getButtonsFromSelector().operationButtons
  const equalsButton = getButtonsFromSelector().equalsButton
  const deleteButton = getButtonsFromSelector().deleteButton
  const allClearButton = getButtonsFromSelector().allClearButton
  const previousOperandTextElement = getButtonsFromSelector().previousOperandTextElement
  const currentOperandTextElement = getButtonsFromSelector().currentOperandTextElement

  class Calulator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }

    isComputed = false

    toggleComputed() {
      this.isComputed = !this.isComputed
    }

    clear() {
      this.currentOperand = DEFAULT_VALUES().currentOperand
      this.previousOperand = DEFAULT_VALUES().previousOperand
      this.operation = DEFAULT_VALUES().operation
    }

    delete() {
      if (this.currentOperand == 0) return
      const sliced = this.currentOperand.toString().slice(0, -1)
      if (sliced === '' || sliced === '0.') {
        this.currentOperand = DEFAULT_VALUES().currentOperand
        return
      }
      this.currentOperand = this.currentOperand
        ? sliced
        : DEFAULT_VALUES().currentOperand
    }

    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      if (this.isComputed) {
        this.currentOperand = number.toString()
        this.toggleComputed()
        return
      }
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
      if (this.currentOperand === DEFAULT_VALUES().currentOperand) return
      if (this.previousOperand !== DEFAULT_VALUES().previousOperand) {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = DEFAULT_VALUES().previousOperand
    }

    compute() {
      let computation
      const previous = parseFloat(this.previousOperand),
        current = parseFloat(this.currentOperand)
      if (isNaN(previous) || isNaN(current)) return
      switch (this.operation) {
        case OPERATIONS().plus:
          computation = previous + current
          break
        case OPERATIONS().minus:
          computation = previous - current
          break
        case OPERATIONS().multiply:
          computation = previous * current
          break
        case OPERATIONS().divide:
          computation = previous / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = DEFAULT_VALUES().operation
      this.previousOperand = DEFAULT_VALUES().previousOperand
      this.toggleComputed()
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
