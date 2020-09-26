import React, { FC, useMemo } from 'react'
import styles from './latest-card.css'
import { useSelector } from 'react-redux'
import { getDeposits } from 'entities/Deposit/queries'
import { Card, CardHead, CardList } from 'uikit/layout/card'
import { Deposit } from 'entities/Deposit/types'
import { Address } from 'uikit/crypto/address'
import { ListItem } from 'uikit/data/list'
import { Flex } from 'uikit/layout/flex'
import { DateTimeDistance } from 'uikit/display/datetime'
import { View } from 'uikit/layout/view'
import { Display } from 'uikit/typography/display'
import { Workflow, WorkflowStep } from 'uikit/display/workflow'
import { Amount } from 'uikit/crypto/amount'
import { formatStatus } from 'entities/Deposit/format'

export const DepositCard = () => {
    const deposits = useSelector(getDeposits)

    const depositsList = useMemo(() => {
        return deposits.map((deposit) => <DepositRow key={deposit.id} deposit={deposit} />)
    }, [deposits])

    return (
        <Card className={styles.card}>
            <CardHead>Deposits</CardHead>
            <CardList className={styles.list}>{depositsList}</CardList>
        </Card>
    )
}

type DepositRowProps = {
    deposit: Deposit
}

const DepositRow: FC<DepositRowProps> = ({ deposit }) => {
    return (
        <ListItem className={styles.row} interactive>
            <div className={styles.cell__id}>
                <Address value={deposit.id} />
                <View paddingTop={8}>
                    <DateTimeDistance size={14} value={deposit.createdAt} secondary />
                </View>
            </div>
            <View className={styles.cell__status}>
                <Display size={15} secondary>
                    {formatStatus(deposit)}
                </Display>
                <Workflow state="success">
                    <WorkflowStep completed={deposit.status >= 1} />
                    <WorkflowStep completed={deposit.status >= 2} />
                    <WorkflowStep completed={deposit.status >= 3} />
                    <WorkflowStep completed={deposit.status >= 4} />
                    <WorkflowStep completed={deposit.status >= 5} />
                </Workflow>
            </View>
            <View className={styles.cell__value}>
                <Amount value={deposit.lotSize}/>
            </View>
            <View className={styles.cell__address}>
                <Display>
                    Sender #: <Address color="brass" value={deposit.senderAddress} />
                </Display>
                <Display>
                    Bitcoin #: <Address color="green" value={deposit.bitcoinAddress} />
                </Display>
            </View>
        </ListItem>
    )
}
