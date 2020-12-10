
function OBTreeToArrayWithId(objList) {
  return objList ? Object.entries(objList).map(item => {
    return { id: item[0], ...item[1] };
  }) : [];
}
const countObjectProperties = obj => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length
  }
  return 0
}
const removeEmptyProperties = obj => {
  const objCopy = { ...obj }
  Object.keys(objCopy).forEach(key => {
    if ([null, undefined].includes(objCopy[key])) {
      delete objCopy[key]
    }
  })
  return objCopy
}

export { OBTreeToArrayWithId, countObjectProperties, removeEmptyProperties }
