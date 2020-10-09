import React, { ComponentProps, FC, useMemo } from 'react'
import { format as formatDate, formatDistance } from 'date-fns'
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

type DateTimeDistanceProps = ComponentProps<typeof Display> & {
    value: string | Date | number
    to?: 'now' | Date | number
    withSuffix?: boolean
    withSeconds?: boolean
}

export const DateTimeDistance: FC<DateTimeDistanceProps> = ({
    value,
    to = 'now',
    withSeconds = true,
    withSuffix = true,
    ...props
}) => {
    const formatted = useMemo(() => {
        const date = new Date(value)
        const target = to === 'now' ? Date.now() : new Date(value)

        return formatDistance(date, target, {
            addSuffix: withSuffix,
            includeSeconds: withSeconds,
        })
    }, [value, to, withSeconds])

    return <Display {...props}>{formatted}</Display>
}
