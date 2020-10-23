import React, { FC } from 'react'
import styles from './list-item.css'
import { View } from 'uikit/layout'
import { Deposit } from 'entities/Deposit/types'
import { ListItem } from 'uikit/data/list'
import { Address } from 'uikit/crypto/address'
import { DateTimeDistance } from 'uikit/display/datetime'
import { Display, DisplayLink } from 'uikit/typography/display'
import { formatStatus } from 'entities/Deposit/format'
import { Amount } from 'uikit/crypto/amount'
import { DepositFlow } from 'components/deposit/flow'

type DepositRowProps = {
    deposit: Deposit
}

export const DepositItem: FC<DepositRowProps> = ({ deposit }) => {
    return (
        <ListItem interactive>
            <DisplayLink className={styles.row} to={`/deposits/${deposit.id}`}>
                <div className={styles.cell__id}>
                    <Address useLink={false} useCopy={false} value={deposit.id} />
                    <View paddingTop={8}>
                        <DateTimeDistance size={14} value={deposit.createdAt} secondary />
                    </View>
                </div>
                <View className={styles.cell__status}>
                    <Display size={15} secondary>
                        {formatStatus(deposit.status)}
                    </Display>
                    <DepositFlow deposit={deposit} />
                </View>
                <View className={styles.cell__value}>
                    <Amount value={deposit.lotSize} />
                </View>
                <View className={styles.cell__address}>
                    <Display>
                        <Address useLink={false} useCopy={false} color="green" value={deposit.senderAddress} />
                    </Display>
                    <Display>
                        <Address useLink={false} useCopy={false} color="brass" value={deposit.bitcoinAddress} />
                    </Display>
                </View></DisplayLink>
        </ListItem>
    )
}

