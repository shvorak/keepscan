import React, { FC } from 'react'
import styles from './keep-info.less'
import { Info } from 'uikit/display/info'
import { Deposit } from 'entities/Deposit/types'
import { field } from 'shared/schema'
import { Address } from 'uikit/crypto/address'
import { Display } from 'uikit/typography/display'
import { Number } from 'uikit/display/number'
import { Amount } from 'uikit/crypto/amount'

type KeepInfoProps = {
    deposit: Deposit
}

const KeepInfoSchema = [
    field('signers', {
        label: 'Signers',
        render: ({ value }) => {
            return value.map((address) => (
                <Address className={styles.signer} key={address} useCopy={false} value={address} />
            ))
        },
    }),
    field('honestThreshold', {
        label: 'Honest threshold',
        render: ({ value, object }) => {
            return (
                <Display>
                    {object.signers.length} of {value}
                </Display>
            )
        },
    }),
    field('collateralization', {
        label: 'Collateralization',
        render: ({ value }) => {
            return <Number value={value} suffix="%" precision={2} />
        },
    }),
    field('bond', {
        label: 'Bond',
        render: ({ value }) => {
            return <Amount value={value} currency="eth" precision={4} />
        },
    }),
]

export const KeepInfo: FC<KeepInfoProps> = ({ deposit, children, ...props }) => {
    return <Info object={deposit} schema={KeepInfoSchema} labelClass={styles.label} />
}
