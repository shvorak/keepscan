import React, { FC } from 'react'
import styles from './list-item.less'
import { Initiator } from 'entities/Initiator/types'
import { ListItem } from 'uikit/data/list'
import { DisplayLink } from 'uikit/typography/display'
import { Address } from 'uikit/crypto/address'
import { DateTime, DateTimeDistance } from 'uikit/display/datetime'
import { InitiatorStat } from 'features/initiators/components/stat'

type InitiatorListItemProps = {
    data: Initiator
}

export const InitiatorListItem: FC<InitiatorListItemProps> = ({data, ...props}) => {
    return (
        <ListItem interactive {...props}>
            <DisplayLink to={`/initiators/${data.id}`} className={styles.root}>
                <div className={styles.cell__id}>
                    <Address value={data.id} full useLink={false} useCopy={false} minimalWide={1024} />
                </div>
                <div className={styles.cell__lastSeen}>
                    <DateTime value={data.lastSeenAt} className={styles.date} />
                    <DateTimeDistance secondary className={styles.date_ago} value={data.lastSeenAt} />
                </div>
                <div className={styles.cell__stats}>
                    <InitiatorStat data={data} />
                </div>
            </DisplayLink>
        </ListItem>
    )
}
