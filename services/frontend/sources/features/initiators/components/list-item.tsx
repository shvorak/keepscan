import React, { FC } from 'react'
import styles from './list-item.less'
import { Initiator } from 'entities/Initiator/types'
import { ListItem } from 'uikit/data/list'
import { Display, DisplayLink } from 'uikit/typography/display'
import { Address } from 'uikit/crypto/address'
import { DateTime, DateTimeDistance } from 'uikit/display/datetime'
import { Amount } from 'uikit/crypto/amount'

type InitiatorListItemProps = {
    data: Initiator
}

export const InitiatorListItem: FC<InitiatorListItemProps> = ({data, ...props}) => {
    return (
        <ListItem interactive {...props}>
            <DisplayLink to={`/initiators/${data.id}`} className={styles.root}>
                <div className={styles.cell__id}>
                    <Address value={data.id} full useLink={false} useCopy={false} />
                </div>
                <div className={styles.cell__lastSeen}>
                    <DateTime value={data.lastSeenAt} className={styles.date} />
                    <DateTimeDistance secondary className={styles.date_ago} value={data.lastSeenAt} />
                </div>
                <div className={styles.cell__deposits}>
                    <Display>{data.depositCount}</Display>
                    <Amount value={data.depositAmount} />
                </div>
                <div className={styles.cell__redeems}>
                    <Display>{data.redeemCount}</Display>
                    <Amount value={data.redeemAmount} />
                </div>
            </DisplayLink>
        </ListItem>
    )
}
