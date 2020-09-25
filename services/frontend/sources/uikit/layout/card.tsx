import React from 'react'
import styles from './card.css'

export const Card = ({ children }) => {
    return <div className={styles.card}>{children}</div>
}

export const CardHead = ({children}) => {
    return <div className={styles.head}>{children}</div>
}
export const CardBody = ({children}) => {
    return <div className={styles.body}>{children}</div>
}
