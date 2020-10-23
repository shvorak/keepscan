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

const InitiatorSchema = [
    field('lastSeenAt', {
        label: 'Last seen',
        render: ({value}) => (
            <>
                <DateTime value={value} />
                <DateTimeDistance secondary value={value} />
            </>
        )
    }),
    field('depositCount', {
        label: 'Minted',
        render: ({value, object}) => (
            <>
                <Number value={value} inline />
                <Display secondary inline>&nbsp;Σ&nbsp;</Display>
                <Amount value={object.depositAmount} inline />
            </>
        )
    }),
    field('redeemCount', {
        label: 'Redeemed',
        render: ({value, object}) => (
            <>
                <Number value={value} inline />
                <Display secondary inline>&nbsp;Σ&nbsp;</Display>
                <Amount value={object.redeemAmount} inline />
            </>
        )
    })
]


export const InitiatorInfo: FC<InitiatorInfoProps> = ({data, ...props}) => {
    return (
        <Info object={data} schema={InitiatorSchema} />
    )
}
