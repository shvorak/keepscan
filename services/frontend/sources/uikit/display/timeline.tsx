import React, { ComponentProps, FC } from 'react'
import styles from './timeline.css'
import { useClasses } from 'shared/hooks/styles'

type TimelineEventProps = ComponentProps<'div'> & {
    state?: 'complete' | 'failure' | 'feature'
    style?: 'violet'
}

export const TimelineEvent: FC<TimelineEventProps> = ({ children, ...props }) => {
    const className = useClasses(styles, 'item', props)

    return (
        <div className={className}>
            <div className={styles.legend}>{children}</div>
        </div>
    )
}
