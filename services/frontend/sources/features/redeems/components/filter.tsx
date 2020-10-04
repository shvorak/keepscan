import React, { useEffect } from 'react'
import styles from './filter.less'
import { Search, Select } from 'uikit/control'
import { LOT_SIZES } from '~/application/env'
import { Amount } from 'uikit/crypto/amount'
import { useModel } from 'shared/hooks/controls'
import { RedeemStatus, RedeemStatusNames } from 'entities/Redeem/constants'

const OPTIONS = Object.values(RedeemStatus).map((status) => {
    return {
        value: status,
        label: RedeemStatusNames[status],
    }
})

const LOT_SIZES_OPTIONS = LOT_SIZES.map((size) => ({
    value: size,
    label: <Amount value={size} />,
}))

export const RedeemFilter = ({ query, onChange }) => {
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
