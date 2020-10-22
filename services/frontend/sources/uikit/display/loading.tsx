import React, { FC } from 'react'
import styles from './loading.less'
import { Placeholder } from 'uikit/display/placeholder'

type LoadingProps = {
    text?: string
}

export const Loading: FC<LoadingProps> = ({text}) => {
    return (
        <Placeholder wide className={styles.loading}>
            {text}
        </Placeholder>
    )
}

Loading.defaultProps = {
    text: 'Loading'
}
