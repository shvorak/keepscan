import React, { ComponentProps, createElement, FC, useMemo } from 'react'
import { useClasses, useStyles } from 'shared/hooks/styles'
import styles from './display.css'

type DisplayProps = ComponentProps<'div'> & {
    // TODO: Allow react component
    as?: string
    size?: string | number
    secondary?: boolean
}

type DisplayLinkProps = ComponentProps<'a'> & {
    to: string
    size?: string | number
    secondary?: boolean
}

const DisplayPropsStyles = {
    size: 'fontSize',
}

export const Display: FC<DisplayProps> = ({ as = 'div', children, ...props }) => {
    const className = useClasses(styles, 'display', props)
    const styleMap = useStyles(props, DisplayPropsStyles)
    return createElement(as, { className, style: styleMap, ...props }, children)
}

export const DisplayLink: FC<DisplayLinkProps> = ({ children, to, ...props }) => {
    const className = useClasses(styles, 'display-link', props)
    const styleMap = useStyles(props, DisplayPropsStyles)

    const href = useMemo(() => {
        // TODO:
        return to
    }, [to])

    return (
        <a href={href} className={className} style={styleMap} {...props}>
            {children}
        </a>
    )
}
