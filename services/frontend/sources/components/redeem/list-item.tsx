import React, { FC } from 'react'
import styles from './list-item.css'
import { Redeem } from 'entities/Redeem/types'
import { ListItem } from 'uikit/data/list'
import { Address } from 'uikit/crypto/address'
import { View } from 'uikit/layout'
import { DateTimeDistance } from 'uikit/display/datetime'
import { Display, DisplayLink } from 'uikit/typography/display'
import { formatStatus } from 'entities/Redeem/format'
import { Amount } from 'uikit/crypto/amount'
import { RedeemFlow } from 'components/redeem/flow'

type RedeemRowProps = {
    redeem: Redeem
}
export const RedeemItem: FC<RedeemRowProps> = ({ redeem }) => {

    return (
        <ListItem interactive>
            <DisplayLink className={styles.row} to={`/redeems/${redeem.id}`}>
                <div className={styles.cell__id}>
                    <Address useLink={false} useCopy={false} value={redeem.id} />
                    <View paddingTop={8}>
                        <DateTimeDistance size={14} value={redeem.createdAt} secondary />
                    </View>
                </div>
                <View className={styles.cell__status}>
                    <Display size={15} secondary>
                        {formatStatus(redeem.status)}
                    </Display>
                    <RedeemFlow redeem={redeem} />
                </View>
                <View className={styles.cell__value}>
                    <Amount value={redeem.lotSize} />
                </View>
                <View className={styles.cell__address}>
                    <Display>
                        <Address useLink={false} useCopy={false} color="green" value={redeem.senderAddress} />
                    </Display>
                    <Display>
                        <Address useLink={false} useCopy={false} color="brass" value={redeem.bitcoinAddress} />
                    </Display>
                </View></DisplayLink>
        </ListItem>
    )
}


