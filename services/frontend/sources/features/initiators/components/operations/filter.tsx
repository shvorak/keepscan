import React, { FC, useEffect } from 'react'
import styles from './filter.less'
import { Query } from 'shared/types'
import { useModel } from 'shared/hooks/controls'
import { Search, Select } from 'uikit/control'
import { LOT_SIZES } from '~/application/env'
import { Amount } from 'uikit/crypto/amount'

type OperationFilterProps = {
    query: Query
    onChange: (query: Query) => any
}

const SelectTypeOptions = [
    { label: 'Deposit', value: 'deposit' },
    { label: 'Redeem', value: 'redeem' },
]

const SelectSizeOptions = LOT_SIZES.map((size) => ({
    label: <Amount value={size} />,
    value: size,
}))

export const OperationFilter: FC<OperationFilterProps> = ({ query, onChange, ...props }) => {
    const [values, { onChangeField }] = useModel(query || {})

    useEffect(() => {
        onChange(values)
    }, [values])

    return (
        <div className={styles.root} {...props}>
            <Search
                label="Search by address"
                value={values.search}
                onChange={onChangeField('search')}
                className={styles.search}
                minLength={4}
            />
            <Select label="Type" options={SelectTypeOptions} value={values.type} onChange={onChangeField('type')} />
            <Select label="Size" options={SelectSizeOptions} value={values.size} onChange={onChangeField('size')} />
        </div>
    )
}
