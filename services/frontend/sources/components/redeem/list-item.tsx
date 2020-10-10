import React, { FC, useMemo } from 'react'
import styles from './list-item.css'
import { Redeem } from 'entities/Redeem/types'
import { ListItem } from 'uikit/data/list'
import { Address } from 'uikit/crypto/address'
import { View } from 'uikit/layout'
import { DateTimeDistance } from 'uikit/display/datetime'
import { Display, DisplayLink } from 'uikit/typography/display'
import { formatStatus } from 'entities/Redeem/format'
import { Workflow, WorkflowStep } from 'uikit/display/workflow'
import { Amount } from 'uikit/crypto/amount'
import { isErrorStatus } from 'entities/Redeem/specs'
import { workflowFactory } from 'entities/Redeem/helpers'

type RedeemRowProps = {
    redeem: Redeem
}
export const RedeemItem: FC<RedeemRowProps> = ({ redeem }) => {

    return (
        <ListItem interactive>
            <DisplayLink className={styles.row} to={`/redeems/${redeem.id}`}>
                <div className={styles.cell__id}>
                    <Address useLink={false} useCopy={false} value={redeem.id} />
                    <View paddingTop={8}>
                        <DateTimeDistance size={14} value={redeem.createdAt} secondary />
                    </View>
                </div>
                <View className={styles.cell__status}>
                    <Display size={15} secondary>
                        {formatStatus(redeem.status)}
                    </Display>
                    <RedeemWorkflow redeem={redeem} />
                </View>
                <View className={styles.cell__value}>
                    <Amount value={redeem.lotSize} />
                </View>
                <View className={styles.cell__address}>
                    <Display>
                        <Address useLink={false} useCopy={false} color="green" value={redeem.senderAddress} />
                    </Display>
                    <Display>
                        <Address useLink={false} useCopy={false} color="brass" value={redeem.bitcoinAddress} />
                    </Display>
                </View></DisplayLink>
        </ListItem>
    )
}


const RedeemWorkflow = ({redeem}) => {

    const states = useMemo(() => {
        return workflowFactory(redeem)
    }, [redeem])

    const stages = useMemo(() => {
        return states.map(status => (
            <WorkflowStep key={status} completed={states.indexOf(redeem.status) >= states.indexOf(status)} />
        ))
    }, [redeem, states])

    const state = isErrorStatus(redeem.status)
        ? 'warning'
        : 'success'

    return (
        <Workflow state={state} variant="redeem">
            {stages}
        </Workflow>
    )
}
