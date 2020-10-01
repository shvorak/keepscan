import React, { useMemo } from 'react'
import styles from './info.css'
import { getRender } from 'shared/schema/utils'

export const Info = ({ schema, object }) => {
    const items = useMemo(() => {
        return schema.filter(field => {
            const value = object[field.name]
            return value != null && value !== 0
        })
            .map(field => {
                const value = object[field.name]
                const renderer = getRender(field)
                const formatted = renderer({value, ...field.options.payload || {}})
                return <Item key={field.name} label={field.options.label} value={formatted} />
            })
    }, [object])

    return <div className={styles.info}>{items}</div>
}

export const Item = ({ label, value }) => (
    <div className={styles.item}>
        <div className={styles.label}>{label}:</div>
        <div className={styles.value}>{value}</div>
    </div>
)
