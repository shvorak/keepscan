import React, { useEffect, useRef } from 'react'
import { useIntersection } from 'shared/hooks/observer'

export const Scroller = ({ loader, visible, children, onLoading }) => {
    const ref = useRef()

    const intersect = useIntersection(ref)

    useEffect(() => {
        intersect && onLoading()
    }, [intersect])

    return (
        <div>
            {children}
            <div ref={ref}>{visible && loader}</div>
        </div>
    )
}
