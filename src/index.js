import React, { useEffect, useRef } from 'react'

const STICKY_BOTTOM = 2
const STICKY_TOP = 1

const PARENT_STYLE = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}

const KeepVisible = function (props) {
  const parentRef = useRef()
  const childRef = useRef()
  const childSticky = useRef(-1)
  const scrollY = useRef(window.scrollY)

  useEffect(() => {
    const positionChild = () => {
      const child = childRef.current
      const parent = parentRef.current

      if (!child || !parent) { return }

      const parentRect = parent.getBoundingClientRect()
      const childRect = child.getBoundingClientRect()

      const scrollingUp = scrollY.current > window.scrollY
      const scrollingDown = scrollY.current < window.scrollY
      const changeDown = scrollingDown && childSticky.current === STICKY_TOP
      const changeUp = scrollingUp && childSticky.current === STICKY_BOTTOM
      const changeDirection = changeDown || changeUp

      const viewPortHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      const fitsInViewPort = childRect.height < viewPortHeight

      const childAboveViewBottom = (childRect.top) < (viewPortHeight - childRect.height)
      const childBelowViewTop = (childRect.top) > 0
      const childInMiddle = !childBelowViewTop && !childAboveViewBottom
      const childEdgeInView = childBelowViewTop || childAboveViewBottom

      if (fitsInViewPort) {
        parent.style.justifyContent = ''
        child.style.position = 'sticky'
        child.style.top = 0
        child.style.bottom = ''
        return
      }

      const childStyle = {}
      const parentStyle = { ...PARENT_STYLE }

      if (changeDirection && childInMiddle) {
        childSticky.current = false
        parentStyle.justifyContent = ''
        childStyle.position = 'relative'
        childStyle.top = (childRect.top - parentRect.top) + 'px'
        childStyle.bottom = ''
      }

      if (scrollingDown && childEdgeInView) {
        childSticky.current = STICKY_BOTTOM
        parentStyle.justifyContent = 'flex-end'
        childStyle.position = 'sticky'
        childStyle.bottom = 0
        childStyle.top = ''
      }

      if (scrollingUp && childEdgeInView) {
        childSticky.current = STICKY_TOP
        parentStyle.justifyContent = ''
        childStyle.position = 'sticky'
        childStyle.top = 0
        childStyle.bottom = ''
      }

      Object.assign(parent.style, parentStyle)
      Object.assign(child.style, childStyle)

      scrollY.current = window.scrollY
    }

    window.addEventListener('scroll', positionChild, { passive: true })
    window.addEventListener('resize', positionChild, { passive: true })
    positionChild()

    return () => {
      window.removeEventListener('scroll', positionChild, { passive: true })
      window.removeEventListener('resize', positionChild, { passive: true })
    }
  }, [childRef])

  return (
    <div ref={parentRef} style={{ height: '100%' }}>
      <div ref={childRef}>{props.children}</div>
    </div>
  )
}

export default KeepVisible
