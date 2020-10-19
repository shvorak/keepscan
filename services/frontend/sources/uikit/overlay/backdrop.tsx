import React, { ComponentProps, FC } from 'react'
import styles from './backdrop.less'
import { useClasses } from 'shared/hooks/styles'

type BackdropProps = ComponentProps<'div'> & {
    visible: boolean
}

export const Backdrop: FC<BackdropProps> = ({ children, ...props }) => {
    const className = useClasses(styles, 'root', props)
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}
