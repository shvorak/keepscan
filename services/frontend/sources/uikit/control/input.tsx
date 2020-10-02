import React, { ComponentProps, FC } from 'react'
import styles from './input.css'
import { useClasses } from 'shared/hooks/styles'

type InputProps = ComponentProps<'input'> & {
    label: string
}

export const Input: FC<InputProps> = ({ value, label, ...props }) => {
    const empty = value == null || value == '' || value == 0

    const className = useClasses(styles, 'field', {...props, empty})

    return (
        <div className={className}>
            <input value={value} {...props} />
            <label>{label}</label>
        </div>
    )
}
