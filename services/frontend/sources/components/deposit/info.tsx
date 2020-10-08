import React from 'react'
import { address, amount, datetime, number } from 'components/deposit/info.fields'
import { field } from 'shared/schema'
import { Info } from 'uikit/display/info'
import { Address } from 'uikit/crypto/address'
import { Token } from 'uikit/crypto/token'

const Schema = [
    field('senderAddress', {
        label: 'Initiator',
        render: address,
    }),
    field('id', {
        label: 'Deposit contract',
        render: address,
    }),
    // field('contractId', {
    //     label: 'Deposit Factory Contract',
    //     render: address,
    // }),
    field('lotSize', {
        label: 'Lot size',
        render: amount,
    }),
    field('lotSizeMinted', {
        label: 'tBTC received',
        render: number,
    }),
    field('lotSizeFee', {
        label: 'tBTC fee',
        render: number,
    }),
    field('spentFee', {
        label: 'ETH spent',
        render: number,
    }),
    field('bitcoinAddress', {
        label: 'Bitcoin deposit address',
        render: address,
        payload: {
            color: 'brass',
        },
    }),
    field('bitcoinFundedBlock', {
        label: 'Bitcoin funded block',
    }),
    field('tokenId', {
        label: 'Token ID',
        render: ({value, object}) => (
            <Token tokenId={value} contractId={object.depositTokenContract}/>
        )
    }),
    field('createdAt', {
        label: 'Initiated',
        render: datetime,
    }),
    field('updatedAt', {
        label: 'Updated',
        render: datetime,
    }),
    field('completedAt', {
        label: 'Completed',
        render: datetime,
    }),
]

export const DepositInfo = ({ deposit }) => <Info object={deposit} schema={Schema} />
