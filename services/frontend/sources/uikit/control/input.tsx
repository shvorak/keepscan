import React, { ComponentProps, FC } from 'react'
import styles from './index.css'
import { useClasses } from 'shared/hooks/styles'
import { isEmpty } from 'uikit/control/helpers'

type InputProps = ComponentProps<'input'> & {
    label: string
}

export const Input: FC<InputProps> = ({ value, label, ...props }) => {
    const empty = isEmpty(value)

    const className = useClasses(styles, 'field', {...props, empty})

    return (
        <div className={className}>
            <input width={300} value={value == null ? '' : value} {...props} />
            <label>{label}</label>
        </div>
    )
}
