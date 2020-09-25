import React from 'react'
import styles from './app.css'
import { NavLink } from 'react-router-dom'

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
                </Section>
            </div>
        </div>
    )
}

const Logo = () => <div className={styles.logo}>KeepScan</div>

const Menu = ({children}) => {
    return (
        <div className={styles.menu}>
            {children}
        </div>
    )
}

const MenuItem = ({to, exact = false, children}) => {
    return (
        <NavLink to={to}>{children}</NavLink>
    )
}

export const Section = ({ children }) => <div className={styles.section}>{children}</div>
