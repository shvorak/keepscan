import React, { FC } from 'react'
import styles from './keep-info.less'
import { Info } from 'uikit/display/info'
import { Deposit } from 'entities/Deposit/types'
import { field } from 'shared/schema'
import { Address } from 'uikit/crypto/address'
import { Display } from 'uikit/typography/display'

type KeepInfoProps = {
    deposit: Deposit
}

const KeepInfoSchema = [
    field('signers', {
        label: 'Signers',
        render: ({ value }) => {
            return value.map(address => (
                <Address className={styles.signer} key={address} copy={false} value={address} />
            ))
        },
    }),
    field('honestThreshold', {
        label: 'Honest threshold',
        render: ({value, object}) => {
            return <Display>{object.signers.length} of {value}</Display>
        }
    })
]

export const KeepInfo: FC<KeepInfoProps> = ({deposit, children, ...props}) => {
    return (
        <Info object={deposit} schema={KeepInfoSchema} labelClass={styles.label} />
    )
}
