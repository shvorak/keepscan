import React, { FC, useEffect } from 'react'
import styles from './filter.less'
import { Query } from 'shared/types'
import { Search } from 'uikit/control'
import { useModel } from 'shared/hooks/controls'

type InitiatorFilterProps = {
    query: Query
    onChange: (query: Query) => any
}

export const InitiatorFilter: FC<InitiatorFilterProps> = ({ query, onChange, ...props }) => {
    const [values, { onChangeField }] = useModel(query || {})

    useEffect(() => {
        onChange(values)
    }, [values, onChange])

    return (
        <div className={styles.root} {...props}>
            <Search label="Search by address" value={values.search} onChange={onChangeField('search')} minLength={4} />
        </div>
    )
}
