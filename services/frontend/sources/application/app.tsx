import React from 'react'
import styles from './app.css'
import { NavLink, Route, Switch } from 'react-router-dom'
import { useClasses } from 'shared/hooks/styles'

import { ApiPage } from './routes/api'
import { DepositsPage } from './routes/deposits'
import { DashboardPage } from '~/application/routes/dashboard'

export const App = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Section>
                    <div className={styles.headline}>
                        <Logo />
                        <Menu>
                            <MenuItem to="/" exact>Dashboard</MenuItem>
                            <MenuItem to="/deposits">Deposits</MenuItem>
                            <MenuItem to="/api">API</MenuItem>
                        </Menu>
                    </div>
                </Section>
                <Section className={styles.content}>
                    <Switch>
                        <Route path="/" exact component={DashboardPage} />
                        <Route path="/api" exact component={ApiPage} />
                        <Route path="/deposits" exact component={DepositsPage} />
                    </Switch>
                </Section>
            </div>
        </div>
    )
}

const Logo = () => <div className={styles.logo}>KeepScan</div>

const Menu = ({ children }) => <div className={styles.menu}>{children}</div>

const MenuItem = ({ to, exact = false, children }) => <NavLink to={to} exact={exact}>{children}</NavLink>

export const Section = ({ children, ...props }) => {
    const className = useClasses(styles, 'section', props)
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}
