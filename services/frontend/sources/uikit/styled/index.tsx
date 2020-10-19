import React, { ComponentProps, ComponentType, createElement } from 'react'
import { useClasses } from 'shared/hooks/styles'

type JSXElement = keyof JSX.IntrinsicElements

const styled = <T extends JSXElement>(
    as: T,
    classMap: Record<string, string>,
    basicClass: string
): ComponentType<ComponentProps<T> & any> => {
    return ({ ...props }) => {
        const className = useClasses(classMap, basicClass, props)
        return createElement(as, { className, ...props })
    }
}

export default styled
