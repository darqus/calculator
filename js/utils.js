export const isNumeric = (value) => Number.isNaN(value)

const NODES_TYPE = () => ({
  simple: 'querySelector',
  multiple: 'querySelectorAll',
})

/**
 * @param {string} sel
 * @param {boolean} isAll
 */
export const getNode = (sel, isAll = false) =>
  isAll
    ? Array.from(document[NODES_TYPE().multiple](sel))
    : document[NODES_TYPE().simple](sel)

const DEFAULT_DIGIT_DELIMITER = '.'
export const DIGIT_DELIMITER = '.'

const MAGIC_MATH_DIGIT_STRING = '0'.repeat(14)

const checkForMagicMathJS = (integerDigits, decimalDigits) =>
  decimalDigits.includes(MAGIC_MATH_DIGIT_STRING)
    ? parseFloat(
        +(integerDigits + DEFAULT_DIGIT_DELIMITER + decimalDigits.slice(0, -1))
      )
        .toString()
        .split(DEFAULT_DIGIT_DELIMITER)[1]
    : decimalDigits

/**
 * @param {string | number} value
 */
export const setDELIMITER = (value) => {
  if (value.toString().includes(DEFAULT_DIGIT_DELIMITER))
    return value.toString()

  const result = value
    .toString()
    .replace(DIGIT_DELIMITER, DEFAULT_DIGIT_DELIMITER)
  console.log('result:', result)
  return result
}

/**
 * @param {string | number} value
 */
export const setDigits = (value) => {
  const stringNumber = value.toString()
  const integerDigits = parseInt(stringNumber)
  const decimalDigits = stringNumber.split(DEFAULT_DIGIT_DELIMITER)[1]

  const integerDisplay = isNumeric(+setDELIMITER(integerDigits))
    ? ''
    : integerDigits

  return decimalDigits === undefined
    ? integerDisplay
    : `${integerDisplay}${DIGIT_DELIMITER}${checkForMagicMathJS(
        integerDigits,
        decimalDigits
      )}`
}

export const OPERATIONS = () => ({
  plus: '+',
  minus: '−',
  multiply: '×',
  divide: '÷',
})

export const calc = (a) => (str) => (b) => {
  switch (str) {
    case OPERATIONS().plus:
      return a + b
    case OPERATIONS().minus:
      return a - b
    case OPERATIONS().multiply:
      return a * b
    case OPERATIONS().divide:
      return a / b
    default:
      return ''
  }
}
