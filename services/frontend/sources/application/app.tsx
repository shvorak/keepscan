import React from 'react'
import styles from './app.css'
import { Route, Switch } from 'react-router-dom'

export const App = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Section>
                    <div className={styles.headline}>
                        <div className={styles.logo}>KeepScan</div>
                    </div>
                </Section>
            </div>
        </div>
    )
}


export const Section = ({ children }) => <div className={styles.section}>{children}</div>
