import { DEFAULT_VALUES } from './model.js'
import { getNode, OPERATIONS, DIGIT_DELIMETER } from './utils.js'

const NODES_SELECTOR_MAP = new Map(
  [
    ['calcButtons', '.calc-buttons']
  ]
)

export const NODES = {}

NODES_SELECTOR_MAP
  .forEach((value, key) => (NODES[key] = getNode(value)))

export const getButtonsFromSelector = () => ({
  numberButtons: getNode('[data-number]', true),
  operationButtons: getNode('[data-operation]', true),
  equalsButton: getNode('[data-equals]'),
  deleteButton: getNode('[data-delete]'),
  clearButton: getNode('[data-clear]'),
  calcMemoiseNode: getNode('[data-memoise]'),
  calcRezultNode: getNode('[data-result]')
})

const OUTPUT_NODE = `<div class="output">
<div data-memoise class="previous-operand"></div>
<div data-result class="current-operand">${DEFAULT_VALUES().operands[1]}</div>
</div>`

export const CALC_BUTTONS = () => ([
  {
    label: 'C',
    attr: 'data-clear',
    className: 'twice'
  },
  {
    label: '◄',
    attr: 'data-delete'
  },
  {
    label: OPERATIONS().divide,
    attr: 'data-operation'
  },
  {
    label: '7',
    attr: 'data-number'
  },
  {
    label: '8',
    attr: 'data-number'
  },
  {
    label: '9',
    attr: 'data-number'
  },
  {
    label: OPERATIONS().multiply,
    attr: 'data-operation'
  },
  {
    label: '4',
    attr: 'data-number'
  },
  {
    label: '5',
    attr: 'data-number'
  },
  {
    label: '6',
    attr: 'data-number'
  },
  {
    label: OPERATIONS().minus,
    attr: 'data-operation'
  },
  {
    label: '1',
    attr: 'data-number'
  },
  {
    label: '2',
    attr: 'data-number'
  },
  {
    label: '3',
    attr: 'data-number'
  },
  {
    label: OPERATIONS().plus,
    attr: 'data-operation'
  },
  {
    label: DIGIT_DELIMETER,
    attr: 'data-number'
  },
  {
    label: '0',
    attr: 'data-number'
  },
  {
    label: '=',
    attr: 'data-equals',
    className: 'twice'
  }
])

export const CALC_BUTTONS_MODES = OUTPUT_NODE + CALC_BUTTONS().map(({ label, attr, className }) => !className ? `<button ${attr}>${label}</button>` : `<button ${attr} class="twice">${label}</button>`).join(' ')
