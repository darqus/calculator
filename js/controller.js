import { getButtonsFromSelector } from './template.js'
import { Calculator } from './Calculator.js'

const calculator = new Calculator(
  getButtonsFromSelector().calcMemoiseNode,
  getButtonsFromSelector().calcResultNode
)

export const init = () => {
  getButtonsFromSelector().numberButtons.forEach((button) =>
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
    })
  )

  getButtonsFromSelector().operationButtons.forEach((button) =>
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
    })
  )

  getButtonsFromSelector().equalsButton.addEventListener('click', () => {
    calculator.computeEqual()
  })

  getButtonsFromSelector().clearButton.addEventListener('click', () => {
    calculator.clear()
  })

  getButtonsFromSelector().deleteButton.addEventListener('click', () => {
    calculator.delete()
  })
}
