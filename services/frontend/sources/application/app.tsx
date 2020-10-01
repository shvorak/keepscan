import React, { useMemo } from 'react'
import styles from './app.css'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import { DisplayLink } from 'uikit/typography/display'
import { useClasses } from 'shared/hooks/styles'
import { ENV_CONFIG } from '~/application/env'

import { ApiPage } from './routes/api'
import { TdtPage } from './routes/tdt'
import { DashboardPage } from './routes/dashboard'
import { RedeemDetailsPage, RedeemListPage } from './routes/redeems'
import { DepositListPage, DepositDetailsPage } from './routes/deposits'
import { GithubLink } from 'components/github'

export const App = () => {
    return (
        <div className={styles.layout}>
                <div className={styles.header}>
                    <Section>
                        <div className={styles.headline}>
                            <Logo />
                            <Menu>
                                <MenuItem to="/" exact>
                                    Dashboard
                                </MenuItem>
                                <MenuItem to="/deposits">Deposits</MenuItem>
                                <MenuItem to="/redeems">Redeems</MenuItem>
                                <MenuItem to="/tdt">Get TDT</MenuItem>
                                {/*<MenuItem to="/api">API</MenuItem>*/}
                            </Menu>
                        </div>
                    </Section>
                    <Section className={styles.content}>
                        <Switch>
                            <Route path="/" exact component={DashboardPage} />
                            <Route path="/api" exact component={ApiPage} />
                            <Route path="/tdt" exact component={TdtPage} />
                            <Route path="/redeems" exact component={RedeemListPage} />
                            <Route path="/redeems/:id" exact component={RedeemDetailsPage} />
                            <Route path="/deposits" exact component={DepositListPage} />
                            <Route path="/deposits/:id" exact component={DepositDetailsPage} />
                        </Switch>
                    </Section>
                </div>
            <Footer>
                <Section>
                    <GithubLink to="https://github.com/emerido/keepscan" />
                </Section>
            </Footer>
        </div>
    )
}

const Logo = () => {
    const net = useMemo(() => ENV_CONFIG[location.hostname], [])

    return (
        <div>
            <Link to="/" className={styles.logo}>
                KeepScan
            </Link>
            <DisplayLink to={net.link} title={net.label} className={styles.net}>
                {net.name}
            </DisplayLink>
        </div>
    )
}

const Menu = ({ children }) => <div className={styles.menu}>{children}</div>

const MenuItem = ({ to, exact = false, children }) => (
    <NavLink to={to} exact={exact}>
        {children}
    </NavLink>
)

export const Section = ({ children, ...props }) => {
    const className = useClasses(styles, 'section', props)
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}

export const Footer = ({ children }) => <div className={styles.footer}>{children}</div>
