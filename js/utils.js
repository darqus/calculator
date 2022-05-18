export const isNumeric = (value) => Number.isNaN(value)

const NODES_TYPE = () => ({
  simple: 'querySelector',
  multiple: 'querySelectorAll'
})

/**
 * @param {string} sel
 * @param {boolean} isAll
*/
export const getNode = (sel, isAll = false) =>  isAll
? Array.from(document[NODES_TYPE().multiple](sel))
  : document[NODES_TYPE().simple](sel)

const DEFAULT_DIGIT_DELIMETER = '.'
export const DIGIT_DELIMETER = '.'

/**
 * @param {string | number} value
*/
export const setDelimeter = (value) => {
  if (value.toString().includes(DEFAULT_DIGIT_DELIMETER)) return value.toString()

  const rezult = value.toString()
    .replace(DIGIT_DELIMETER, DEFAULT_DIGIT_DELIMETER)
  console.log('rezult:', rezult)
  return rezult
}

/**
 * @param {string | number} value
*/
export const setDigits = (value) => {
  const stringNumber = value.toString()
  const integerDigits = parseInt(stringNumber)
  const decimalDigits = stringNumber.split(DEFAULT_DIGIT_DELIMETER)[1]
  const integerDisplay = isNumeric(+setDelimeter(integerDigits))
    ? ''
    : integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0
    })

  return decimalDigits === undefined
    ? integerDisplay
    : `${integerDisplay}${DIGIT_DELIMETER}${decimalDigits}`
}

export const OPERATIONS = () => ({
  plus: '+',
  minus: '−',
  multiply: '×',
  divide: '÷',
})

export const calc = a => str => b => {
  switch (str) {
    case OPERATIONS().plus: return a + b
    case OPERATIONS().minus: return a - b
    case OPERATIONS().multiply: return a * b
    case OPERATIONS().divide: return a / b
    default: return ''
  }
}
