import React from 'react'
import { field } from 'shared/schema'
import { address, amount, datetime } from 'components/deposit/info.fields'
import { Info } from 'uikit/display/info'

const Schema = [
    field('senderAddress', {
        label: 'Initiator',
        render: address,
    }),
    field('id', {
        label: 'TDT',
        render: address,
    }),
    field('contractId', {
        label: 'tBTC contract',
        render: address,
    }),
    field('lotSize', {
        label: 'Lot size',
        render: amount,
    }),
    field('bitcoinAddress', {
        label: 'Bitcoin recipient address',
        render: address,
        payload: {
            color: 'brass',
        },
    }),
    field('bitcoinFundedBlock', {
        label: 'Bitcoin funded block',
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


export const RedeemInfo = ({ redeem }) => <Info object={redeem} schema={Schema} />
