import { NODES, getButtonsFromSelector, CALC_MODES } from './template.js'
import { Calulator } from './Calculator.js'

NODES.calcButtons.innerHTML = CALC_MODES

const calulator = new Calulator(
  getButtonsFromSelector().calcMemoiseNode,
  getButtonsFromSelector().calcRezultNode
)

export const init = () => {
  getButtonsFromSelector().numberButtons
    .forEach((button) => button.addEventListener('click', () => {
    calulator.appendNumber(button.innerText)
  }))

  getButtonsFromSelector().operationButtons
    .forEach((button) => button.addEventListener('click', () => {
    calulator.chooseOperation(button.innerText)
  }))

  getButtonsFromSelector().equalsButton
    .addEventListener('click', () => {
    calulator.computeEqual()
  })

  getButtonsFromSelector().clearButton
    .addEventListener('click', () => {
    calulator.clear()
  })

  getButtonsFromSelector().deleteButton
    .addEventListener('click', () => {
    calulator.delete()
  })
}
