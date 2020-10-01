import React, { FC } from 'react'
import styles from './list-item.css'
import { View } from 'uikit/layout'
import { Deposit } from 'entities/Deposit/types'
import { useLink } from 'shared/hooks/router'
import { ListItem } from 'uikit/data/list'
import { Address } from 'uikit/crypto/address'
import { DateTimeDistance } from 'uikit/display/datetime'
import { Display } from 'uikit/typography/display'
import { formatStatus } from 'entities/Deposit/format'
import { Workflow, WorkflowStep } from 'uikit/display/workflow'
import { Amount } from 'uikit/crypto/amount'
import { buildStatuses } from 'entities/Deposit/helpers'
import { DepositStatus } from 'entities/Deposit/constants'
import { isErrorStatus } from 'entities/Deposit/specs'

type DepositRowProps = {
    deposit: Deposit
}

const DepositSuccessStatuses = [
    DepositStatus.InitiatingDeposit,
    DepositStatus.WaitingForBtc,
    DepositStatus.BtcReceived,
    DepositStatus.SubmittingProof,
    DepositStatus.ApprovingTdtSpendLimit,
    DepositStatus.Minted
]

export const DepositItem: FC<DepositRowProps> = ({ deposit }) => {

    const onClick = useLink(`/deposits/${deposit.id}`)

    return (
        <ListItem className={styles.row} interactive onClick={onClick}>
            <div className={styles.cell__id}>
                <Address link={false} copy={false} value={deposit.id} />
                <View paddingTop={8}>
                    <DateTimeDistance size={14} value={deposit.createdAt} secondary />
                </View>
            </div>
            <View className={styles.cell__status}>
                <Display size={15} secondary>
                    {formatStatus(deposit.status)}
                </Display>
                <DepositFlow deposit={deposit} />
            </View>
            <View className={styles.cell__value}>
                <Amount value={deposit.lotSize} />
            </View>
            <View className={styles.cell__address}>
                <Display>
                    <Address link={false} copy={false} color="green" value={deposit.senderAddress} />
                </Display>
                <Display>
                    <Address link={false} copy={false} color="brass" value={deposit.bitcoinAddress} />
                </Display>
            </View>
        </ListItem>
    )
}

const DepositFlow = ({deposit}) => {
    const statuses = buildStatuses(DepositSuccessStatuses, deposit.transactions || [])
        .map(status => <WorkflowStep key={status} completed={deposit.status >= status} />)

    const state = isErrorStatus(deposit.status) ? 'warning' : 'success'
    return (
        <Workflow state={state}>
            {statuses}
        </Workflow>
    )
}
