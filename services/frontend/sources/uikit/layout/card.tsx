import React, { ComponentProps, FC } from 'react'
import styles from './card.css'
import { List } from 'uikit/data/list'
import { useClasses } from 'shared/hooks/styles'

type CardProps = ComponentProps<'div'> & {

}
type CardListProps = ComponentProps<typeof List> & {

}

export const Card: FC<CardProps> = ({ children, ...props }) => {
    const className = useClasses(styles, 'card', props)
    return <div className={className} {...props}>{children}</div>
}

export const CardHead = ({children}) => {
    return <div className={styles.head}>{children}</div>
}
export const CardBody = ({children}) => {
    return <div className={styles.body}>{children}</div>
}

export const CardList: FC<CardListProps> = ({children, ...props}) => {
    return <List {...props}>{children}</List>
}


