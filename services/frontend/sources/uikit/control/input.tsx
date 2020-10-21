import React, { ComponentProps, FC } from 'react'
import styles from './index.css'
import { useClasses } from 'shared/hooks/styles'
import { isEmpty } from 'uikit/control/helpers'

type InputProps = ComponentProps<'input'> & {
    label: string
    action?: 'arrow' | 'reset'
    onAction?: () => any
}

export const Input: FC<InputProps> = ({ value, label, action, onAction, ...props }) => {
    const empty = isEmpty(value)

    const className = useClasses(styles, 'field', {...props, empty})

    const actionNode = action && <InputAction type={action} onClick={onAction} />

    return (
        <div className={className}>
            <input width={300} value={value == null ? '' : value} {...props} className={null} />
            <label>{label}</label>
            {actionNode}
        </div>
    )
}


export const InputAction = ({onClick, ...props}) => {
    const className = useClasses(styles, 'action', props)
    return <div className={className} onClick={onClick} />
}
