import React, { createElement, FC } from 'react'
import { useClasses } from 'shared/hooks/styles'
import styles from './display.css'

type DisplayProps = {
    // TODO: Allow react component
    as?: string
    secondary?: boolean
}

export const Display: FC<DisplayProps> = ({as = 'div', children, ...props}) => {
    const className = useClasses(styles, 'display', props)
    return createElement(as, {className, ...props}, children)
}
