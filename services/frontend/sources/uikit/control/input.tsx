import React, { ComponentProps, FC } from 'react'

type InputProps = ComponentProps<'input'> & {

}

export const Input: FC<InputProps> = ({value, ...props}) => {
    return <input value={value} {...props} />
}
