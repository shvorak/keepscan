import React, { ComponentProps, FC, useCallback, useEffect, useState } from 'react'
import { Input } from 'uikit/control/input'
import { useDebounce } from 'react-use'
import { extractValue } from 'shared/hooks/controls'

type SearchProps = ComponentProps<typeof Input> & {
    debounce?: number
}

export const Search: FC<SearchProps> = ({ value, onChange, debounce, minLength, ...props }) => {
    const [dirty, setDirty] = useState(value)

    useEffect(() => {
        setDirty(value)
    }, [value])

    useDebounce(
        () => {
            if (typeof dirty === 'string' && (dirty.length === 0 || dirty.length >= minLength)) {
                // @ts-ignore
                onChange(dirty)
            }
        },
        debounce || 500,
        [dirty, onChange]
    )

    const onChangeDirty = useCallback((event) => {
        setDirty(extractValue(event))
    }, [])

    return <Input onChange={onChangeDirty} value={dirty} {...props} />
}

Search.defaultProps = {
    debounce: 500,
    minLength: 0
}
