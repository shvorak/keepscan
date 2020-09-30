import React, { ComponentProps, FC } from 'react'
import styles from './placeholder.css'
import { useClasses } from 'shared/hooks/styles'

type LoadingProps = ComponentProps<'div'> & {
    wide?: boolean
    visible?: boolean
}


export const Placeholder: FC<LoadingProps> = ({children, ...props}) => {
    const className = useClasses(styles, 'placeholder', props)
    return <div className={className} {...props}><span>{children}</span></div>
}

Placeholder.defaultProps = {
    visible: true
}
