import React, { ComponentProps, FC, useMemo } from 'react'
import { format as formatDate } from 'date-fns'
import { Display } from 'uikit/typography/display'

const DEFAULT_FORMAT = 'yyyy.MM.dd HH:mm:ss'

type DateTimeProps = ComponentProps<typeof Display> & {
    value: string | Date | number
    format?: string
}

export const DateTime: FC<DateTimeProps> = ({ value, format = DEFAULT_FORMAT, ...props }) => {
    const formatted = useMemo(() => {
        return value && formatDate(new Date(value), format)
    }, [value, format])

    return <Display {...props}>{formatted}</Display>
}
