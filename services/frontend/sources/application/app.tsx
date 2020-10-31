import React from 'react'
import styles from './app.less'
import { Route, Switch } from 'react-router-dom'
import { useClasses } from 'shared/hooks/styles'

import { ApiPage } from './routes/api'
import { TdtPage } from './routes/tdt'
import { DashboardPage } from './routes/dashboard'
import { RedeemDetailsPage, RedeemListPage } from './routes/redeems'
import { DepositDetailsPage, DepositListPage } from './routes/deposits'
import { GithubLink, MediumLink } from 'components/social'
import { Header } from 'components/layout/header'
import { ScrollArea } from 'uikit/scroll'
import { InitiatorInfoPage, InitiatorListPage } from '~/application/routes/initiators'

export const App = () => {
    return (
        <ScrollArea className={styles.layout}>
            <div className={styles.wrapper}>
                <Section>
                    <Header />
                </Section>
                <Section className={styles.content}>
                    <Switch>
                        <Route path="/" exact component={DashboardPage} />
                        <Route path="/tdt" exact component={TdtPage} />
                        <Route path="/redeems" exact component={RedeemListPage} />
                        <Route path="/redeems/:id" exact component={RedeemDetailsPage} />
                        <Route path="/deposits" exact component={DepositListPage} />
                        <Route path="/deposits/:id" exact component={DepositDetailsPage} />
                        <Route path="/initiators" exact component={InitiatorListPage} />
                        <Route path="/initiators/:id" exact component={InitiatorInfoPage} />
                    </Switch>
                </Section>
            </div>
            <Footer>
                <Section className={styles.socials}>
                    <GithubLink to="https://github.com/emerido/keepscan" />
                    <MediumLink to="https://keepscan.medium.com/" />
                </Section>
            </Footer>
        </ScrollArea>
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
