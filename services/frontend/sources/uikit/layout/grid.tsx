import React, { ComponentProps, CSSProperties, FC } from 'react'
import { useStyles } from 'shared/hooks/styles'

type GridProps = ComponentProps<'div'> & {
    gap?: CSSProperties['gap']
    rows?: CSSProperties['gridTemplateRows']
    cols?: CSSProperties['gridTemplateColumns']
    areas?: CSSProperties['gridTemplateAreas']
}

const GridStyles = {
    rows: 'gridTemplateRows',
    cols: 'gridTemplateColumns',
    areas: 'gridTemplateAreas',
}

export const Grid: FC<GridProps> = ({children, ...props}) => {
    const styleMap = useStyles(props, GridStyles)

    return <div {...props} style={styleMap}>{children}</div>
}
