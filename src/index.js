import React, { useEffect, useLayoutEffect, useRef } from 'react'

const KeepVisible = function (props) {
  const childRef = useRef()
  let alreadyHandling
  let lastScrollPosition

  useEffect(() => {
    window.addEventListener('scroll', handleScrollAction)
    window.addEventListener('resize', handleScrollAction)
    positionChild()

    return () => {
      window.removeEventListener('scroll', handleScrollAction)
      window.removeEventListener('resize', handleScrollAction)
    }
  }, [ childRef ])

  useLayoutEffect(() => positionChild(), [ childRef ])
  
  const handleScrollAction = () => {
    lastScrollPosition = window.scrollY
    positionChild()
  }

  const positionChild = () => {
    if (alreadyHandling) { return }
    alreadyHandling = true

    window.requestAnimationFrame(() => {
      alreadyHandling = false
      
      const child = childRef.current
      const parent = child.parentElement

      if (!child || !parent) { return }
  
      const notScrolling = lastScrollPosition === window.scrollY
      const scrollingUp = lastScrollPosition > window.scrollY
      const scrollingDown = lastScrollPosition < window.scrollY
  
      const childRect = child.getBoundingClientRect()
      const parentRect = parent.getBoundingClientRect()
      
      const viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      const fitsInViewPort = childRect.height < viewPortHeight
  
      const childAboveViewBottom = (childRect.top) < (viewPortHeight - childRect.height)
      const childBelowViewTop = (childRect.top) > 0
      
      const minPosition = 0
      const maxPosition = Math.max(parentRect.height - childRect.height, 0)
  
      let newTop = false
  
      if (fitsInViewPort) { newTop = -parentRect.top }
      if (!fitsInViewPort) {
        if ((notScrolling || scrollingUp) && childBelowViewTop) {
          newTop = -parentRect.top
        }
        if ((notScrolling || scrollingDown) && childAboveViewBottom) {
          newTop = (-parentRect.top + viewPortHeight) - childRect.height - 1
        }
      }
      
      if (newTop !== false) {
        newTop = Math.max(newTop, minPosition)
        newTop = Math.min(newTop, maxPosition)
        child.style.transform = `translateY( ${newTop}px)`
      }
    })
  }
  
  return <div ref={childRef}>
    {props.children}
  </div>
  
}

export default KeepVisible