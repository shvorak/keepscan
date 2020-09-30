import React, { useCallback, useMemo } from 'react'
import styles from './lot-size.css'
import { useClasses } from 'shared/hooks/styles'

export const LotSizeList = ({ variants, selected, onSelect }) => {
    const lots = useMemo(() => {
        return variants.map((size) => {
            return <LotSize key={size} size={size} selected={selected === size} onSelect={onSelect} />
        })
    }, [variants, selected, onSelect])
    return <div className={styles.lot_size_list}>{lots}</div>
}

export const LotSize = ({ size, selected, onSelect }) => {
    const className = useClasses(styles, 'lot_size', { selected })

    const onClick = useCallback(() => onSelect(size), [size, onSelect])

    return (
        <div className={className} onClick={onClick}>
            <div className={styles.size}>{size} ฿</div>
        </div>
    )
}
