import React, { FC } from 'react'
import { Redeem } from 'entities/Redeem/types'
import styles from 'features/dashboard/cards/deposits/index.css'
import { ListItem } from 'uikit/data/list'
import { useLink } from 'shared/hooks/router'
import { Address } from 'uikit/crypto/address'
import { View } from 'uikit/layout'
import { DateTimeDistance } from 'uikit/display/datetime'
import { Display } from 'uikit/typography/display'
import { Workflow, WorkflowStep } from 'uikit/display/workflow'
import { Amount } from 'uikit/crypto/amount'
import { formatStatus } from 'entities/Redeem/format'

type RedeemRowProps = {
    redeem: Redeem
}


export const RedeemRow: FC<RedeemRowProps> = ({redeem}) => {
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
                <Workflow state="success" variant="redeem">
                    <WorkflowStep completed={redeem.status >= 0} />
                    <WorkflowStep completed={redeem.status >= 1} />
                    <WorkflowStep completed={redeem.status >= 2} />
                </Workflow>
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

