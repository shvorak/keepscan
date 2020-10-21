import React, { FC, useCallback } from 'react'
import styles from './list.less'
import { Card, CardFilter, CardHead, CardHeadSuffix, CardList } from 'uikit/layout/card'
import { InitiatorFilter } from 'features/initiators/components/filter'

type InitiatorListProps = {

}

export const InitiatorList: FC<InitiatorListProps> = ({children, ...props}) => {
    const query = {}

    const onQueryChange = useCallback(query => {

    }, [])

    return (
        <Card>
            <CardHead size={2}>
                Initiators
                <CardHeadSuffix>{234}</CardHeadSuffix>
            </CardHead>
            <CardFilter>
                <InitiatorFilter query={query} onChange={onQueryChange} />
            </CardFilter>
            <CardList className={styles.body}>
                {/*{content}*/}
            </CardList>
        </Card>
    )
}
