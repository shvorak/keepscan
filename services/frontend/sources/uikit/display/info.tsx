import React, { FC, useMemo } from 'react'
import styles from './info.css'
import classes from 'classnames'
import { getRender } from 'shared/schema/utils'

type InfoProps = {
    schema: any
    object: any

    itemClass?: string
    labelClass?: string
    valueClass?: string
}

export const Info: FC<InfoProps> = ({ schema, object, itemClass, labelClass, valueClass }) => {
    const items = useMemo(() => {
        return schema
            .filter((field) => {
                const value = object[field.name]
                return value != null && value !== 0
            })
            .map((field) => {
                const value = object[field.name]
                const renderer = getRender(field)
                const formatted = renderer({ value, object, ...(field.options.payload || {}) })
                return (
                    <Item
                        key={field.name}
                        label={field.options.label}
                        value={formatted}
                        itemClass={itemClass}
                        labelClass={labelClass}
                        valueClass={valueClass}
                    />
                )
            })
    }, [object])

    return <div className={styles.info}>{items}</div>
}

export const Item = ({ label, value, itemClass, labelClass, valueClass }) => (
    <div className={classes(styles.item, itemClass)}>
        <div className={classes(styles.label, labelClass)}>{label}:</div>
        <div className={classes(styles.value, valueClass)}>{value}</div>
    </div>
)
