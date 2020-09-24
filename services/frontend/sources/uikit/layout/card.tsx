import React from 'react'
import styles from './card.css'

export const Card = ({ children }) => {
    return <div className={styles.card}>{children}</div>
}
