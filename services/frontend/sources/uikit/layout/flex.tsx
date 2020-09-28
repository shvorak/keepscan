import React, { ComponentProps, CSSProperties, FC } from 'react'
import { useClasses, useStyles } from 'shared/hooks/styles'
import styles from './flex.css'

type FlexProps = ComponentProps<'div'> & {
    grow?: CSSProperties['flexGrow']
    wrap?: CSSProperties['flexWrap']
    flow?: CSSProperties['flexFlow']
    basis?: CSSProperties['flexBasis']
    shrink?: CSSProperties['flexShrink']
    direction?: CSSProperties['flexDirection']

    inline?: boolean

    justifyContent?: CSSProperties['justifyContent']
    justifyItems?: CSSProperties['justifyItems']
    justifySelf?: CSSProperties['justifySelf']
    alignContent?: CSSProperties['alignContent']
    alignItems?: CSSProperties['alignItems']
    alignSelf?: CSSProperties['alignSelf']

    placeContent?: CSSProperties['placeContent']
    placeItems?: CSSProperties['placeItems']
    placeSelf?: CSSProperties['placeSelf']
}

const FlexPropsAliases = {
    grow: 'flexGrow',
    wrap: 'flexWrap',
    flow: 'flexFlow',
    basis: 'flexBasis',
    shrink: 'flexShrink',
    direction: 'flexDirection'
}

export const Flex: FC<FlexProps> = ({children, ...props}) => {
    const className = useClasses(styles, 'flex', props)
    const styleMap = useStyles(props, FlexPropsAliases)
    return (
        <div className={className} style={styleMap} {...props}>
            {children}
        </div>
    )
}
