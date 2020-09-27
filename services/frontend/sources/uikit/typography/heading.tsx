import React, { ComponentProps, createElement, FC } from 'react'

type HeadingProps = ComponentProps<'h1'> & {
    size?: 1 | 2 | 3 | 4 | 5
}

export const Heading: FC<HeadingProps> = ({size = 1, children, ...props}) => {
    return createElement(`h${size}`, props, children)
}
