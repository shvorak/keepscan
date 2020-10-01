import React, { FC } from 'react'
import styles from './list-item.css'
import { Redeem } from 'entities/Redeem/types'
import { useLink } from 'shared/hooks/router'
import { ListItem } from 'uikit/data/list'
import { Address } from 'uikit/crypto/address'
import { View } from 'uikit/layout'
import { DateTimeDistance } from 'uikit/display/datetime'
import { Display } from 'uikit/typography/display'
import { formatStatus } from 'entities/Redeem/format'
import { Workflow, WorkflowStep } from 'uikit/display/workflow'
import { Amount } from 'uikit/crypto/amount'
import { RedeemStatus } from 'entities/Redeem/constants'

type RedeemRowProps = {
    redeem: Redeem
}
export const RedeemItem: FC<RedeemRowProps> = ({ redeem }) => {
    const onClick = useLink(`/redeems/${redeem.id}`)

    return (
        <ListItem className={styles.row} interactive onClick={onClick}>
            <div className={styles.cell__id}>
                <Address link={false} value={redeem.id} />
                <View paddingTop={8}>
                    <DateTimeDistance size={14} value={redeem.createdAt} secondary />
                </View>
            </div>
            <View className={styles.cell__status}>
                <Display size={15} secondary>
                    {formatStatus(redeem)}
                </Display>
                <RedeemWorkflow redeem={redeem} />
            </View>
            <View className={styles.cell__value}>
                <Amount value={redeem.lotSize} />
            </View>
            <View className={styles.cell__address}>
                <Display>
                    <Address link={false} color="green" value={redeem.senderAddress} />
                </Display>
                <Display>
                    <Address link={false} color="brass" value={redeem.bitcoinAddress} />
                </Display>
            </View>
        </ListItem>
    )
}


const RedeemWorkflow = ({redeem}) => {
    const state = redeem.status === RedeemStatus.Liquidated
        ? 'warning'
        : 'success'

    return (
        <Workflow state={state} variant="redeem">
            <WorkflowStep completed={redeem.status >= 0} />
            <WorkflowStep completed={redeem.status >= 1} />
            <WorkflowStep completed={redeem.status >= 2} />
        </Workflow>
    )
}
