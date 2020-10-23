import React, { FC } from 'react'
import styles from './list-item.less'

type OperationItemProps = {

}

export const OperationItem: FC<OperationItemProps> = ({children, ...props}) => {
    return (
        <div className={styles.root} {...props}>{children}</div>
    )
}
