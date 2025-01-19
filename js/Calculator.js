import { DIGIT_DELIMETER, isNumeric, setDigits, calc } from './utils.js'
import { DEFAULT_VALUES } from './model.js'

export class Calculator {
  constructor(calcMemoiseNode, calcRezultNode) {
    this.calcMemoiseNode = calcMemoiseNode
    this.calcRezultNode = calcRezultNode
    // this.clear()
  }

  // DATA
  STATE = DEFAULT_VALUES()
  // isComputed = DEFAULT_VALUES().isComputed

  // GETTERS (computed)
  get existMemoiseOperand() {
    return this.STATE.operands[0] !== DEFAULT_VALUES().operands[0]
  }

  get existRezultOperand() {
    return this.STATE.operands[1] !== DEFAULT_VALUES().operands[1]
  }

  get existTempRezult() {
    return this.STATE.tempRezult !== DEFAULT_VALUES().tempRezult
  }

  get existOperation() {
    return this.STATE.operation !== DEFAULT_VALUES().operation
  }

  /* get clickedEquals() {
    return this.STATE.countClickEqiual > DEFAULT_VALUES().countClickEqiual
  } */

  // SETTERS (computed)
  /**
   * @param {string | number} value
   */
  set setMemoiseOperand(value = DEFAULT_VALUES().operands[0]) {
    // return this.STATE.operands[0] = setDelimeter(value)
    return (this.STATE.operands[0] = value.toString())
  }

  /**
   * @param {string | number} value
   */
  set setRezultOperand(value = DEFAULT_VALUES().operands[1]) {
    //  return this.STATE.operands[1] = setDelimeter(value)
    return (this.STATE.operands[1] = value.toString())
  }

  /**
   * @param {string | number} value
   */
  set setTempRezult(value = DEFAULT_VALUES().tempRezult) {
    // return this.STATE.tempRezult = setDelimeter(value)
    return (this.STATE.tempRezult = value.toString())
  }

  /**
   * @param {string} value
   */
  set setOperation(value = DEFAULT_VALUES().operation) {
    return (this.STATE.operation = value)
  }

  // METHODS
  /* incrementCountClickEqiual() {
    this.STATE.countClickEqiual++
  } */

  log(value, func) {
    console.log()
    console.log('______________', value, func)
    console.log('operands:', this.STATE.operands)
    console.log('tempRezult:', this.STATE.tempRezult)
    console.log('operation:', this.STATE.operation)
  }

  clear() {
    this.STATE = DEFAULT_VALUES()
    this.updateDisplayMemoise('clear')
    this.updateDisplayResult('clear')
  }

  clearMemoiseOperand() {
    this.setMemoiseOperand = DEFAULT_VALUES().operands[0]
  }

  delete() {
    if (!this.existRezultOperand) return
    this.log('before', 'delete')

    const sliced = this.STATE.operands[1].toString().slice(0, -1)

    this.setRezultOperand = [
      '',
      `${DEFAULT_VALUES().operands[1]}${DIGIT_DELIMETER}`,
    ].includes(sliced)
      ? DEFAULT_VALUES().operands[1]
      : this.existRezultOperand
      ? sliced
      : DEFAULT_VALUES().operands[1]

    if (!this.existRezultOperand) {
      this.clear()
    }

    this.updateDisplayResult('delete')

    this.log('after', 'delete')
  }

  /**
   * @param {string | number} value
   */
  appendNumber(value) {
    console.log('value:', value)

    if (
      value === DIGIT_DELIMETER &&
      this.STATE.operands[1].includes(DIGIT_DELIMETER)
    )
      return

    this.log('before', 'appendNumber')

    let resultDigit = value

    if (this.existRezultOperand) {
      resultDigit = this.STATE.operands[1].toString() + value
    }

    if (value === DIGIT_DELIMETER) {
      resultDigit = DEFAULT_VALUES().operands[1] + DIGIT_DELIMETER
    }

    console.log('resultDigit:', resultDigit)

    const resultOperand = resultDigit.toString()

    console.log('resultOperand: ', resultOperand)

    console.log(
      'all',
      this.existMemoiseOperand &&
        this.existOperation &&
        this.existTempRezult &&
        this.existRezultOperand
    )

    /* if (this.existMemoiseOperand && this.existOperation && this.existTempRezult && this.existRezultOperand) {
      this.clear()
    } */

    this.setRezultOperand = resultOperand

    if (!this.existMemoiseOperand) {
      this.setTempRezult = resultOperand
    }

    // console.log('this.existMemoiseOperand:', this.existMemoiseOperand)

    this.updateDisplayResult('appendNumber')

    this.log('after', 'appendNumber')
  }

  /**
   * @param {string} operation
   */
  chooseOperation(operation) {
    this.log('before', 'chooseOperation')

    console.log('chooseOperation() OPERATION: ', operation)

    this.setOperation = operation

    console.log('EXIST_OPERATION: ', this.existOperation)

    this.updateDisplayMemoise('chooseOperation')

    // this.setTempRezult = this.STATE.operands[1]
    this.setMemoiseOperand = this.STATE.operands[1]
    this.setRezultOperand = DEFAULT_VALUES().operands[0]

    this.log('after', 'chooseOperation')
  }

  computeEqual() {
    this.log('before', 'computeEqual')

    const OPERANDS = [this.STATE.operands[0], this.STATE.operands[1]].map((_) =>
      parseFloat(_)
    )

    console.log(OPERANDS)

    const isNumberOperands =
      OPERANDS.map((_) => isNumeric(_)).filter(Boolean).length === 0

    if (!isNumberOperands) {
      OPERANDS[1] = OPERANDS[0]
    }

    console.log('isNumberOperands:', isNumberOperands)

    console.log(OPERANDS)

    console.log('############operation:', this.STATE.operation)

    console.log('not exist res op:', !this.existRezultOperand)

    console.log('this.existMemoiseOperand %%%:', !this.existMemoiseOperand)

    if (!this.existOperation) {
      this.setMemoiseOperand = this.STATE.operands[1]
    }

    if (this.existOperation) {
      console.log('####', this.STATE.operands[1])

      // this.setTempRezult = this.STATE.operands[1]
      this.setMemoiseOperand = this.STATE.operands[1]
      this.setRezultOperand = setDigits(
        calc(OPERANDS[0])(this.STATE.operation)(OPERANDS[1])
      )

      console.log('resultOperand: ', this.STATE.operands[1])

      // this.setOperation = DEFAULT_VALUES().operation

      this.updateDisplayMemoise('computeEqual')
      this.updateDisplayResult('computeEqual')
    }

    this.log('after', 'computeEqual')
  }

  /**
   * @param {string} operation
   */
  updateDisplayMemoise(operation) {
    console.log('________________________________________')
    console.log('updateDisplayMemoise()')
    console.log('___OPERATION: ', operation)

    this.log('before', 'updateDisplayMemoise')

    let memoise

    switch (operation) {
      case 'clear':
        memoise = DEFAULT_VALUES().operands[0]
        break
      case 'delete':
        memoise = DEFAULT_VALUES().operands[0]
        break
      case 'appendNumber':
        console.log('this.existOperation:', this.existOperation)
        memoise = this.existOperation
          ? `${setDigits(this.STATE.operands[1])} ${this.STATE.operation} =`
          : DEFAULT_VALUES().operands[0]
        break
      case 'chooseOperation':
        console.log('this.existOperation:', this.existOperation)
        memoise = this.existOperation
          ? `${setDigits(this.STATE.tempRezult)} ${this.STATE.operation}`
          : `${setDigits(this.STATE.operands[1])} ${this.STATE.operation} =`
        break
      case 'computeEqual':
        memoise = `${setDigits(this.STATE.tempRezult)} ${
          this.STATE.operation
        } ${setDigits(this.STATE.operands[0] || this.STATE.tempRezult)} =`
        break
      default:
        return this.STATE.operands[0]
    }

    console.log('memoise: ', memoise)

    this.calcMemoiseNode.innerText = memoise

    this.log('after', 'updateDisplayMemoise')
  }

  /**
   * @param {string} operation
   */
  updateDisplayResult(operation) {
    console.log('________________________________________')
    console.log('updateDisplayResult')
    console.log('___OPERATION: ', operation)

    this.log('before', 'updateDisplayResult')

    // const rezult = this.STATE.operands[1]

    let rezult = this.STATE.operands[1]

    switch (operation) {
      case 'clear':
        rezult = DEFAULT_VALUES().operands[1]
        break
      case 'delete':
        break
      case 'appendNumber':
        break
      case 'chooseOperation':
        // console.log(this.existOperation)
        // rezult = DEFAULT_VALUES().operands[1]
        break
      case 'computeEqual':
        // rezult = DEFAULT_VALUES().operands[1]
        break
      default:
        return this.STATE.operands[1]
    }

    console.log('rezult:', rezult)

    this.calcRezultNode.innerText = setDigits(rezult)

    this.log('after', 'updateDisplayResult')
  }
}
