import React, {
  type ReactNode,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import {useMounted} from '~/hooks/use-mounted'

type CarouselProps = {
  interval?: number
  children: ReactNode
}

const Carousel = ({interval, children}: CarouselProps) => {
  return React.Children.toArray(children).length > 1 ? (
    <Slider interval={interval}>{children}</Slider>
  ) : (
    <div>{children}</div>
  )
}

const Slider = ({interval = 5, children}: CarouselProps) => {
  const mounted = useMounted()
  const [windowSize, setWindowSize] = useState<{
    width?: number
    height?: number
  }>({})
  const [index, setIndex] = useState(2)
  const timer = useRef(interval)
  const paused = useRef(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const shiftRef = useRef('')
  const shift = index > 0 ? `calc(${index} * ${shiftRef.current})` : '0px'

  const childrenArray = React.Children.toArray(children) as ReactElement[]
  const allChildren = mounted
    ? [
        React.cloneElement(childrenArray[childrenArray.length - 2], {
          'aria-hidden': true,
        }),
        React.cloneElement(childrenArray[childrenArray.length - 1], {
          'aria-hidden': true,
        }),
        ...childrenArray,
        React.cloneElement(childrenArray[0], {'aria-hidden': true}),
        React.cloneElement(childrenArray[1], {'aria-hidden': true}),
      ]
    : childrenArray

  const [transitionActive, setTransitionActive] = useState(false)
  const transitionStyle = transitionActive ? 'transform 0.7s ease-out' : 'none'

  const windowWidth = windowSize?.width

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({width: window.innerWidth, height: window.innerHeight})
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!windowWidth || !trackRef.current || !itemRef.current) {
      return
    }

    const itemWidth = itemRef.current.offsetWidth
    const gap = window
      .getComputedStyle(trackRef.current)
      .getPropertyValue('column-gap')
    shiftRef.current = `calc(-1 * (${itemWidth}px + ${gap}))`
    setIndex(2)
  }, [windowWidth])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!document.hidden && !paused.current) {
        timer.current -= 1
        if (timer.current === 0) {
          timer.current = interval
          setTransitionActive(true)
          setIndex(i => i + 1)
        }
      }
    }, 1000)
    return () => clearInterval(intervalId)
  }, [interval])

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.target !== trackRef.current) {
      return
    }

    if (index === 0) {
      setTransitionActive(false)
      setIndex(childrenArray.length)
    } else if (index === childrenArray.length + 1) {
      setTransitionActive(false)
      setIndex(1)
    }
  }

  return (
    <div
      className="carousel"
      onTouchStart={() => (paused.current = true)}
      onTouchEnd={() => (paused.current = false)}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div
        ref={trackRef}
        style={{
          transform: `translateX(${shift})`,
          transition: transitionStyle,
        }}
        className="carousel-track"
        onTransitionEnd={handleTransitionEnd}
      >
        {allChildren.map((child, i) => (
          <div
            ref={itemRef}
            style={
              i === index - 1
                ? {opacity: 0}
                : i < index - 1 || i > index + 1
                ? {visibility: 'hidden'}
                : {}
            }
            className="carousel-item"
            key={i}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export {Carousel}
