import React, { useMemo } from 'react'
import styles from './app.css'
import { Link, NavLink, Route, Switch, useLocation } from 'react-router-dom'
import { useClasses } from 'shared/hooks/styles'

import { ApiPage } from './routes/api'
import { DashboardPage } from '~/application/routes/dashboard'
import { DepositListPage, DepositDetailsPage } from './routes/deposits'
import { Display, DisplayLink } from 'uikit/typography/display'
import { useMount } from 'shared/hooks/lifecycle'

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
                        <Route path="/deposits" exact component={DepositListPage} />
                        <Route path="/deposits/:id" exact component={DepositDetailsPage} />
                    </Switch>
                </Section>
            </div>
        </div>
    )
}

const Logo = () => {
    const net = useMemo(() => {
        const config = {
            localhost: {name: 'Testnet Dev', link: 'https://keepscan.com', label: 'Click to switch into Mainnet' },
            'testnet.keepscan.com': {name: 'Testnet', link: 'https://keepscan.com', label: 'Click to switch into Mainnet' },
            'keepscan.com': {name: 'Mainnet', link: 'https://testnet.keepscan.com', label: 'Click to switch into Testnet' },
        }

        return config[location.hostname]
    }, [])

    return (
        <div>
            <Link to="/" className={styles.logo}>
                KeepScan
            </Link>
            <DisplayLink to={net.link} title={net.label} className={styles.net} secondary>
                {net.name}
            </DisplayLink>
        </div>
    )
}

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
