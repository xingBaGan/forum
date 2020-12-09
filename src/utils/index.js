
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

export { OBTreeToArrayWithId, countObjectProperties }
