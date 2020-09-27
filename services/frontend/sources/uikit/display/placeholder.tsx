import React, { FC } from 'react'
import styles from './placeholder.css'
import { useClasses } from 'shared/hooks/styles'

type LoadingProps = {
    wide?: boolean
    visible?: boolean
}


export const Placeholder: FC<LoadingProps> = ({children, ...props}) => {
    const className = useClasses(styles, 'placeholder', props)
    return <div className={className}><span>{children}</span></div>
}

Placeholder.defaultProps = {
    visible: true
}
