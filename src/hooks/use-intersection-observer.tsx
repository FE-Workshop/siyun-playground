import { useRef } from 'react'

const useIntersectionObserver = (callback) => {
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback()
          }
        })
      },
      { threshold: 1 }
    )
  )

  const observe = (element: Element) => {
    observer.current.observe(element)
  }

  const unobserve = (element: Element) => {
    observer.current.unobserve(element)
  }

  return [observe, unobserve] as const
}

export default useIntersectionObserver
