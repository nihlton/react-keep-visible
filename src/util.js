export const elementInViewport = (el) => {
  var rect = el.getBoundingClientRect()
  
  return (
    parseInt(rect.top) >= 0 &&
    parseInt(rect.left) >= 0 &&
    parseInt(rect.bottom) <= (window.innerHeight || document.documentElement.clientHeight) &&
    parseInt(rect.right) <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export const elementPartiallyInViewport = (el) => {
  var top = parseInt(el.offsetTop)
  var left = parseInt(el.offsetLeft)
  var width = parseInt(el.offsetWidth)
  var height = parseInt(el.offsetHeight)
  
  while (el.offsetParent) {
    el = el.offsetParent
    top += el.offsetTop
    left += el.offsetLeft
  }
  
  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  )
}


export const cumulativeOffset = (element) => {
  let top = 0
  let left = 0
  if (!element) { return false }
  do {
    top += element.offsetTop || 0
    left += element.offsetLeft || 0
    element = element.offsetParent
  } while (element)
  
  return {
    top: top,
    left: left
  }
}
