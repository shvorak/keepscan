import React, { ComponentProps, FC, ReactElement, ReactNode, useCallback, useMemo, useState } from 'react'
import styles from './index.css'
import overlay from './select.css'
import { Dropdown, useDropdownMenu, useDropdownToggle } from 'react-overlays'
import { useClasses } from 'shared/hooks/styles'
import { isEmpty } from 'uikit/control/helpers'

type SelectProps = ComponentProps<'select'> & {
    label?: string
    options?: { value: string | number; label: ReactElement | ReactNode }[]
    onChange?: (value: any) => any
}


export const Select: FC<SelectProps> = ({ label, value, options, onChange, ...props }) => {
    const [opened, setOpened] = useState(false)

    const empty = isEmpty(value)

    const onToggle = useCallback((nextShow: boolean, event) => {
        setOpened(nextShow)
    }, [])

    const onSelect = useCallback(value => {
        onChange && onChange(value)
    }, [onChange])

    const className = useClasses(styles, 'field', { ...props, empty })

    const selected = options.find((x) => x.value === value)

    return (
        <Dropdown show={opened} onToggle={onToggle}>
            {({ props }) => (
                <div {...props} className={className}>
                    <Trigger label={label} value={selected && selected.label} />
                    <Overlay options={options} onSelect={onSelect} />
                </div>
            )}
        </Dropdown>
    )
}

const Trigger = ({ label, value }) => {
    const [props, { show, toggle }] = useDropdownToggle()

    const onClick = useCallback(
        (event) => {
            toggle(!show)
        },
        [show, toggle]
    )

    const className = useClasses(styles, 'input', { focus: show })

    return (
        <>
            <input className={className} readOnly {...props} onClick={onClick} defaultValue={value} />
            <label>{label}</label>
            <div className={`${styles.symbol} ${styles.arrow}`} />
        </>
    )
}

const Overlay = ({ options, onSelect }) => {
    const { show, props } = useDropdownMenu({
        flip: true,
        offset: [0, 0],
    })

    const className = useClasses(overlay, 'container', { show })

    const selectOptions = useMemo(() => {
        return options.map((option) => {
            return (
                <SelectOption key={option.value} value={option.value} onSelect={onSelect}>
                    {option.label}
                </SelectOption>
            )
        })
    }, [options, onSelect])

    return (
        <div className={className} {...props}>
            {selectOptions}
        </div>
    )
}

const SelectOption = ({ value, children, onSelect }) => {
    const onClick = useCallback((event) => {
        onSelect && onSelect(value)
    }, [value, onSelect])
    return <div onClick={onClick} className={overlay.option}>{children}</div>
}
