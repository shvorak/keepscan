import React, { FC } from 'react'
import styles from './list.css'
import { useClasses } from 'shared/hooks/styles'


export const List = ({children}) => {
    return (
        <ul className={styles.list}>
            {children}
        </ul>
    )
}

type ListItemProps = {
    interactive?: boolean
}

export const ListItem: FC<ListItemProps> = ({children, ...props}) => {
    const className = useClasses(styles, 'item', props)

    return <li className={className}>{children}</li>
}
