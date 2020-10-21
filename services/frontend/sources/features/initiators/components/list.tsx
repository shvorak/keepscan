import React, { FC, useCallback, useMemo } from 'react'
import styles from './list.less'
import { Card, CardFilter, CardHead, CardHeadSuffix, CardList } from 'uikit/layout/card'
import { InitiatorFilter } from 'features/initiators/components/filter'
import { useSelector } from 'react-redux'
import { getInitiatorsList } from 'features/initiators/queries'
import { InitiatorListItem } from 'features/initiators/components/list-item'

type InitiatorListProps = {}

export const InitiatorList: FC<InitiatorListProps> = ({ children, ...props }) => {
    const items = useSelector(getInitiatorsList)
    const query = {}

    const onQueryChange = useCallback((query) => {}, [])

    const content = useMemo(() => {
        return items.map((data) => <InitiatorListItem key={data.id} data={data} />)
    }, [items])

    return (
        <Card>
            <CardHead size={2}>
                Initiators
                <CardHeadSuffix>{234}</CardHeadSuffix>
            </CardHead>
            <CardFilter>
                <InitiatorFilter query={query} onChange={onQueryChange} />
            </CardFilter>
            <CardList className={styles.body}>{content}</CardList>
        </Card>
    )
}
