import React from 'react'
import styles from './app.css'
import { NavLink } from 'react-router-dom'
import { DepositCard } from 'features/deposits/latest-card'

export const App = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Section>
                    <div className={styles.headline}>
                        <Logo />
                        <Menu>
                            <MenuItem to="/">Home</MenuItem>
                        </Menu>
                    </div>

                    <DepositCard />
                </Section>
            </div>
        </div>
    )
}

const Logo = () => <div className={styles.logo}>KeepScan</div>

const Menu = ({ children }) => <div className={styles.menu}>{children}</div>

const MenuItem = ({ to, children }) => <NavLink to={to}>{children}</NavLink>

export const Section = ({ children }) => <div className={styles.section}>{children}</div>
