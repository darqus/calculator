const NODES_TYPE = () => ({
  simple: 'querySelector',
  multiple: 'querySelectorAll'
})

export const getNode = (/** @type {string} */ sel, /** @type {boolean} */ isAll = false) =>  isAll
? Array.from(document[NODES_TYPE().multiple](sel))
  : document[NODES_TYPE().simple](sel)
