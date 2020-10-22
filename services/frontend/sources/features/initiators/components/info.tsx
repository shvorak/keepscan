import React, { FC } from 'react'
import { Info } from 'uikit/display/info'
import { Initiator } from 'entities/Initiator/types'
import { field } from 'shared/schema'
import { amount, datetime, number } from 'components/deposit/info.fields'

type InitiatorInfoProps = {
    data: Initiator
}

const InitiatorSchema = [
    field('lastSeenAt', {
        label: 'Last seen',
        render: datetime
    }),
    field('depositCount', {
        label: 'Deposit count',
        render: number
    }),
    field('depositAmount', {
        label: 'Deposit amount',
        render: amount
    }),
    field('redeemCount', {
        label: 'Redeem count',
        render: number
    }),
    field('redeemAmount', {
        label: 'Redeem amount',
        render: amount
    })
]


export const InitiatorInfo: FC<InitiatorInfoProps> = ({data, ...props}) => {
    return (
        <Info object={data} schema={InitiatorSchema} />
    )
}
