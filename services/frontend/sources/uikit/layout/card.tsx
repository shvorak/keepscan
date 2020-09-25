import React from 'react'
import styles from './card.css'
import { List } from 'uikit/data/list'

export const Card = ({ children }) => {
    return <div className={styles.card}>{children}</div>
}

export const CardHead = ({children}) => {
    return <div className={styles.head}>{children}</div>
}
export const CardBody = ({children}) => {
    return <div className={styles.body}>{children}</div>
}

export const CardList = ({children}) => {
    return <List>{children}</List>
}


