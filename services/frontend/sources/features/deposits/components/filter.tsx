import React, { useEffect } from 'react'
import styles from './filter.less'
import { Search, Select } from 'uikit/control'
import { DepositStatus, DepositStatusNames } from 'entities/Deposit/constants'
import { LOT_SIZES } from '~/application/env'
import { Amount } from 'uikit/crypto/amount'
import { useModel } from 'shared/hooks/controls'

const OPTIONS = Object.values(DepositStatus)
    .map((status) => {
        return {
            value: status,
            label: DepositStatusNames[status],
        }
    })

const LOT_SIZES_OPTIONS = LOT_SIZES.map((size) => ({
    value: size,
    label: <Amount value={size} />,
}))

export const DepositFilter = ({ query, onChange }) => {
    const [values, { onChangeField }] = useModel(query || {})

    useEffect(() => {
        onChange && onChange(values)
    }, [values, onChange])

    return (
        <div className={styles.filter}>
            <Search
                className={styles.search}
                label="Search by TDT, Bitcoin or Ethereum address"
                value={values.search}
                onChange={onChangeField('search')}
                minLength={4}
            />
            <Select
                className={styles.status}
                label="Current status"
                value={values.status}
                onChange={onChangeField('status')}
                options={OPTIONS}
            />
            <Select
                className={styles.lotSizes}
                label="Lot size"
                value={values.lotSize}
                onChange={onChangeField('lotSize')}
                options={LOT_SIZES_OPTIONS}
            />
        </div>
    )
}
