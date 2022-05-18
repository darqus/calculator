import { OUTPUT } from './template.js'
import { NODES, CALC_BUTTONS, getButtonsFromSelector } from './model.js'
import { Calulator } from './Calculator.js'

const calcButtons = OUTPUT + CALC_BUTTONS().map(({ label, attr, className }) => !className ? `<button ${attr}>${label}</button>` : `<button ${attr} class="twice">${label}</button>`).join(' ')

NODES.calcButtons.innerHTML = calcButtons

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
