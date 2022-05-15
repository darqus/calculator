import { getNode } from './utils.js'

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
  allClearButton: getNode('[data-all-clear]'),
  previousOperandTextElement: getNode('[data-previous-operand]'),
  currentOperandTextElement: getNode('[data-current-operand]')
})


export const OPERATIONS = () => ({
  plus: '+',
  minus: '−',
  multiply: '×',
  divide: '÷',
})

export const CALC_BUTTONS = () => ([
  {
    label: 'AC',
    attr: 'data-all-clear',
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
    label: OPERATIONS().plus,
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
    label: OPERATIONS().minus,
    attr: 'data-operation'
  },
  {
    label: '.',
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

export const DEFAULT_VALUES = () => ({
  currentOperand: '0',
  previousOperand: '',
  operation: undefined
})
