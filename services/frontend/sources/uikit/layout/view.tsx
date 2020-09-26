import React, { createElement, CSSProperties, FC } from 'react'
import { useStyles } from 'shared/hooks/styles'

type ViewProps = CSSProperties & {
    as?: string
}

export const View: FC<ViewProps> = ({ as = 'div', children, ...props }) => {
    const style = useStyles(props)

    return createElement(as, { ...props, style }, children)
}
