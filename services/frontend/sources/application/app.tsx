import React from 'react'
import styles from './app.css'
import { NavLink } from 'react-router-dom'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Heading } from 'uikit/typography'
import { useMount } from 'shared/hooks/lifecycle'
import { useAction } from 'shared/hooks/redux'
import { startup } from 'features/startup/actions'

export const App = () => {
    const startupAction = useAction(startup)

    useMount(() => {
        startupAction()
    })

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

                    <Card>
                        <CardHead>
                            <Heading size={3}>Deposits</Heading>
                        </CardHead>
                        <CardBody>Some Data</CardBody>
                    </Card>
                </Section>
            </div>
        </div>
    )
}

const Logo = () => <div className={styles.logo}>KeepScan</div>

const Menu = ({ children }) => <div className={styles.menu}>{children}</div>

const MenuItem = ({ to, children }) => <NavLink to={to}>{children}</NavLink>

export const Section = ({ children }) => <div className={styles.section}>{children}</div>
