import React from 'react'
import styles from './app.css'
import { NavLink, Route, Switch } from 'react-router-dom'
import { Home } from '~/application/routes/home'
import { Deposits } from '~/application/routes/deposits'

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
                        </Menu>
                    </div>

                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/deposits" exact component={Deposits} />
                    </Switch>
                </Section>
            </div>
        </div>
    )
}

const Logo = () => <div className={styles.logo}>KeepScan</div>

const Menu = ({ children }) => <div className={styles.menu}>{children}</div>

const MenuItem = ({ to, exact = false, children }) => <NavLink to={to} exact={exact}>{children}</NavLink>

export const Section = ({ children }) => <div className={styles.section}>{children}</div>
