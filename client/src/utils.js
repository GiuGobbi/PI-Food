export const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
  } 

export const isEmpty = (arr) => {
    if (Array.isArray(arr) && arr.length > 0) return true
    else return false
}