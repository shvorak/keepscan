import React, { ComponentProps, FC, useMemo } from 'react'
import { Display } from 'uikit/typography/display'

type NumberProps = ComponentProps<typeof Display> & {
    value: string | number
    suffix?: string
    precision?: number
}


export const Number: FC<NumberProps> = ({value, suffix, precision, ...props}) => {
    const number = useMemo(() => {
        // TODO: Refactor this
        return parseFloat(parseFloat(value as any).toFixed(precision)).toString()
    }, [value, precision])

    return <Display {...props}>{number}{suffix}</Display>
}

Number.defaultProps = {
    precision: 4
}
