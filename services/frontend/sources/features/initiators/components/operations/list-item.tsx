import React, { FC } from 'react'
import styles from './list-item.less'
import { InitiatorOperation } from 'entities/Initiator/types'
import { ListItem } from 'uikit/data/list'
import styled from 'uikit/styled'
import { Address } from 'uikit/crypto/address'
import { DateTimeDistance } from 'uikit/display/datetime'
import { Display, DisplayLink } from 'uikit/typography/display'
import { formatStatus as depositStatus } from 'entities/Deposit/format'
import { formatStatus as redeemStatus } from 'entities/Redeem/format'
import { DepositFlow } from 'components/deposit/flow'
import { RedeemFlow } from 'components/redeem/flow'
import { Amount } from 'uikit/crypto/amount'

type OperationItemProps = {
    data: InitiatorOperation
}

const Icon = styled('div', styles, 'icon')

const Status = ({ data }) => {
    if (data.type === 'redeem') {
        return <RedeemStatus data={data} />
    }
    if (data.type === 'deposit') {
        return <DepositStatus data={data} />
    }
    return null
}

export const OperationItem: FC<OperationItemProps> = ({ data }) => {
    const link = data.type === 'deposit' ? `/deposits/${data.tdt}` : `/redeems/${data.tdt}`
    return (
        <ListItem interactive>
            <DisplayLink to={link} className={styles.root}>
                <Icon type={data.type} />

                <div className={styles.key}>
                    <Address full value={data.tdt} minimalWide={1024} useCopy={false} useLink={false} />
                    <DateTimeDistance value={data.createdAt} className={styles.createdAt} />
                </div>

                <div className={styles.status}>
                    <Status data={data} />
                </div>

                <div className={styles.amount}>
                    <Amount value={data.lotSize} />
                </div>

                <div className={styles.address}>
                    <Address value={data.senderAddress} color="green" useCopy={false} useLink={false} />
                    <Address value={data.bitcoinAddress} color="brass" useCopy={false} useLink={false} />
                </div>
            </DisplayLink>
        </ListItem>
    )
}

const DepositStatus = ({ data }) => {
    return (
        <>
            <Display>{depositStatus(data.status)}</Display>
            <DepositFlow deposit={data} />
        </>
    )
}

const RedeemStatus = ({ data }) => {
    return (
        <>
            <Display>{redeemStatus(data.status)}</Display>
            <RedeemFlow redeem={data} />
        </>
    )
}
