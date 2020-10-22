import React, { FC, useEffect, useRef } from 'react'
import { useIntersection } from 'shared/hooks/observer'
import { Loading } from 'uikit/display/loading'

type ScrollerProps = {
    loader?: React.ReactElement
    loading: boolean
    children: any
    onLoading: () => any
}

/**
 * @deprecated use `Pagination` instead
 */
export const Scroller: FC<ScrollerProps> = ({ loader, loading, children, onLoading }) => {
    const ref = useRef()

    const intersect = useIntersection(ref)

    useEffect(() => {
        intersect && onLoading()
    }, [intersect])

    return (
        <div>
            {children}
            <div ref={ref}>{loading && loader}</div>
        </div>
    )
}

Scroller.defaultProps = {
    loader: <Loading />
}
