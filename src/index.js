import React, { useEffect, useRef } from 'react'
import { cumulativeOffset, elementInViewport, elementPartiallyInViewport } from './util'



const KeepVisible = function (props) {
  const childRef = useRef()

  let alreadyHandling
  let lastScrollPosition
  let scrollDirection


  useEffect(() => {
    childRef.current.style.position = 'relative'
    window.addEventListener('scroll', handleScrollAction)
    window.addEventListener('resize', handleScrollAction)
    positionChild()

    return () => {
      window.removeEventListener('scroll', handleScrollAction)
      window.removeEventListener('resize', handleScrollAction)
    }
  }, [ childRef ])

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
      const childTop = childRect.top
      const childHeight = childRect.height
      const parentTop = parentRect.top
      const parentHeight = parentRect.height
      const viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      const fitsInViewPort = childHeight < viewPortHeight
  
      const childAboveViewBottom = (childTop) < (viewPortHeight - childHeight)
      const childBelowViewTop = (childTop) > 0
      
      const minPosition = 0
      const maxPosition = Math.max(parentHeight - childHeight, 0)
  
      let newTop = false
  
      if (fitsInViewPort) {
        newTop = -parentTop
      }
  
      if (!fitsInViewPort) {
        if ((notScrolling || scrollingDown) && childAboveViewBottom) {
          newTop = (-parentTop + viewPortHeight) - childHeight - 5
        }
        if ((notScrolling || scrollingUp) && childBelowViewTop) {
          newTop = -parentTop
        }
      }
      
      if (!newTop) {
        return
      }
      
      newTop = Math.max(newTop, minPosition)
      newTop = Math.min(newTop, maxPosition)
      child.style.top = newTop + 'px'
    })
  }
  
  return <div ref={childRef}>
    {props.children}
  </div>
  
}

export default KeepVisible