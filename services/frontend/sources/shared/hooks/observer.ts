import { useLayoutEffect, useState } from 'react'

export const useIntersection = (ref, options = null) => {
    const [intersect, setIntersect] = useState(false)

    useLayoutEffect(() => {
        const observer = new IntersectionObserver(([e]) => {
            setIntersect(e.isIntersecting)
        }, options || { threshold: [0, 1] })

        observer.observe(ref.current)

        return () => {
            observer.unobserve(ref.current)
            observer.disconnect()
        }
    }, [ref.current])

    return intersect
}
