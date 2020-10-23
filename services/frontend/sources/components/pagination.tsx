import React, { FC, useEffect, useRef } from 'react'
import styles from './pagination.less'
import { Pager } from 'shared/types'
import { Loading } from 'uikit/display/loading'
import { useIntersection } from 'shared/hooks/observer'

type PaginationProps = {
    pager: Pager,
    loader?: React.ReactElement
    loading: () => any
}

export const Pagination: FC<PaginationProps> = ({pager, loader, children, loading}) => {
    const latest = useRef<number>()
    const trigger = useRef()

    const visible = useIntersection(trigger, {
        threshold: [0, 1]
    })

    useEffect(() => {
        if (pager.loading || pager.current === pager.pages || latest.current === pager.current || !visible) {
            return
        }

        latest.current = pager.current
        loading()
    }, [visible, pager.loading])

    const progress = pager.loading && pager.current < pager.pages

    return (
        <div className={styles.root}>
            {children}
            {progress && loader}
            <div ref={trigger} className={styles.trigger} />
        </div>
    )
}

Pagination.defaultProps = {
    loader: <Loading />
}
