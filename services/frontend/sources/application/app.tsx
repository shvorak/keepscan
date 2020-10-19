import React, { useCallback, useState } from 'react'
import styles from './app.css'
import { Route, Switch } from 'react-router-dom'
import { useClasses } from 'shared/hooks/styles'

import { ApiPage } from './routes/api'
import { TdtPage } from './routes/tdt'
import { DashboardPage } from './routes/dashboard'
import { RedeemDetailsPage, RedeemListPage } from './routes/redeems'
import { DepositDetailsPage, DepositListPage } from './routes/deposits'
import { GithubLink } from 'components/github'
import { Header } from 'components/layout/header'
import { useScrollbarWidth } from 'react-use'

export const App = () => {
    const scrollWidth = useScrollbarWidth()

    const [opened, setOpened] = useState<boolean>()

    const onOpen = useCallback(() => {
        setOpened(true)
    }, [])

    const layoutStyle = opened && {
        paddingRight: scrollWidth,
        overflow: 'hidden'
    }

    return (
        <div className={styles.layout}>
            <div className={styles.header} style={layoutStyle}>
                <Section>
                    <Header opened={opened} onOpen={onOpen} />
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


export const Section = ({ children, ...props }) => {
    const className = useClasses(styles, 'section', props)
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}

export const Footer = ({ children }) => <div className={styles.footer}>{children}</div>
