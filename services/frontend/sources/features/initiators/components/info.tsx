import React, { FC } from 'react'
import { Info } from 'uikit/display/info'
import { Initiator } from 'entities/Initiator/types'
import { field } from 'shared/schema'
import { amount, datetime, number } from 'components/deposit/info.fields'
import { Number } from 'uikit/display/number'
import { Display } from 'uikit/typography/display'
import { Amount } from 'uikit/crypto/amount'
import { DateTime, DateTimeDistance } from 'uikit/display/datetime'

type InitiatorInfoProps = {
    data: Initiator
}

const stat = ({value}) => (
    <>
        <Number value={value.count} inline />
        <Display secondary inline>&nbsp;Σ&nbsp;</Display>
        <Amount value={value.amount} inline />
    </>
)

const InitiatorSchema = [
    field('lastSeenAt', {
        label: 'Last seen',
        render: ({ value }) => (
            <>
                <DateTime value={value} />
                <DateTimeDistance secondary value={value} />
            </>
        ),
    }),
    field('minted', {
        label: 'Minted',
        render: stat,
        hidden: (subject) => subject.minted.count === 0,
    }),
    field('redeemed', {
        label: 'Redeemed',
        render: stat,
        hidden: (subject) => subject.redeemed.count === 0,
    }),
    field('depositsProcessing', {
        label: 'Deposits in progress',
        render: stat,
    }),
    field('depositsFailed', {
        label: 'Deposits failed',
        render: stat,
    }),
    field('redeemsProcessing', {
        label: 'Redeems in progress',
        render: stat,
    }),
    field('redeemsLiquidation', {
        label: 'Liquidation',
        render: stat,
    }),
    field('redeemsLiquidated', {
        label: 'Liquidated',
        render: stat,
    }),
    field('totalEthSpent', {
        label: 'Total ETH fees',
        render: number,
    }),
    field('totalBtcSpent', {
        label: 'Total BTC fees',
        render: number,
    }),
]


export const InitiatorInfo: FC<InitiatorInfoProps> = ({data, ...props}) => {
    return (
        <Info object={data} schema={InitiatorSchema} />
    )
}
