import React, { ComponentProps, FC } from 'react'
import styles from './list.css'
import { useClasses } from 'shared/hooks/styles'

type ListProps = ComponentProps<'ul'>

export const List: FC<ListProps> = ({children, ...props}) => {
    const className = useClasses(styles, 'list', props)
    return (
        <ul className={className} {...props}>
            {children}
        </ul>
    )
}

type ListItemProps = ComponentProps<'li'> & {
    interactive?: boolean
}

export const ListItem: FC<ListItemProps> = ({children, ...props}) => {
    const className = useClasses(styles, 'item', props)

    return <li className={className} {...props}>{children}</li>
}
