import React, { ComponentProps, createElement, CSSProperties, FC } from 'react'
import { useStyles } from 'shared/hooks/styles'

type ViewProps = ComponentProps<'div'> & CSSProperties & {
    as?: string
}

export const View: FC<ViewProps> = ({ as = 'div', children, className, ...props }) => {
    const style = useStyles(props)

    return createElement(as, { ...props, className, style }, children)
}
