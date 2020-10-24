import React, { ComponentProps, FC } from 'react'
import styles from './loading.less'
import { Placeholder } from 'uikit/display/placeholder'
import { useClasses } from 'shared/hooks/styles'

type LoadingProps = ComponentProps<typeof Placeholder> & {
    text?: string
}

export const Loading: FC<LoadingProps> = ({text, ...props}) => {
    const className = useClasses(styles, 'loading', props)
    return (
        <Placeholder wide className={className} {...props}>
            {text}
        </Placeholder>
    )
}

Loading.defaultProps = {
    text: 'Loading'
}
