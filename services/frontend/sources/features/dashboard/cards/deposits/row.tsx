import React, { FC } from 'react'
import styles from './index.css'
import { Deposit } from 'entities/Deposit/types'
import { ListItem } from 'uikit/data/list'
import { Address } from 'uikit/crypto/address'
import { View } from 'uikit/layout'
import { DateTimeDistance } from 'uikit/display/datetime'
import { Display } from 'uikit/typography/display'
import { formatStatus } from 'entities/Deposit/format'
import { Workflow, WorkflowStep } from 'uikit/display/workflow'
import { Amount } from 'uikit/crypto/amount'
import { useLink } from 'shared/hooks/router'

type DepositRowProps = {
    deposit: Deposit
}

export const DepositRow: FC<DepositRowProps> = ({ deposit }) => {

    const onClick = useLink(`/deposits/${deposit.id}`)

    return (
        <ListItem className={styles.row} interactive onClick={onClick}>
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
                <Amount value={deposit.lotSize} />
            </View>
            <View className={styles.cell__address}>
                <Display>
                    <Address color="green" value={deposit.senderAddress} />
                </Display>
                <Display>
                    <Address color="brass" value={deposit.bitcoinAddress} />
                </Display>
            </View>
        </ListItem>
    )
}
