import React from 'react'
import styles from './empty.less'
import { Placeholder } from 'uikit/display/placeholder'


export const Empty = ({}) => (
    <Placeholder wide className={styles.empty}>
        No results
    </Placeholder>
)
