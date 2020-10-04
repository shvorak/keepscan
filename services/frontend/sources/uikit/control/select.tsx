import React, { ComponentProps, FC, ReactElement, ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import styles from './index.css'
import overlay from './select.css'
import { Dropdown, useDropdownMenu, useDropdownToggle } from 'react-overlays'
import { useClasses } from 'shared/hooks/styles'
import { isEmpty } from 'uikit/control/helpers'
import { useRefEvent } from 'shared/hooks/common'
import { Fragment } from 'react'

type SelectProps = ComponentProps<'select'> & {
    label?: string
    options?: { value: string | number; label: ReactElement | ReactNode }[]
    onChange?: (value: any) => any
}

export const Select: FC<SelectProps> = ({ label, value, options, onChange, ...props }) => {
    const [opened, setOpened] = useState(false)

    // TODO: Allow multiple
    const empty = isEmpty(value)

    const onToggle = useCallback((nextShow: boolean, event) => {
        setOpened(nextShow)
    }, [])

    const onSelect = useCallback(
        (value) => {
            onChange && onChange(value)
            setOpened(false)
        },
        [onChange]
    )

    const className = useClasses(styles, 'field', { ...props })

    // TODO: Allow multiple
    const selected = useMemo(() => {
        if (empty) {
            return 'All'
        }
        return options
            // TODO: Check condition for `value is array`
            .filter((x) => x.value === value)
            .map((option) => <Fragment key={option.value}>{option.label}</Fragment>)
    }, [value, options])

    return (
        <Dropdown show={opened} onToggle={onToggle}>
            {({ props }) => (
                <div {...props} className={className}>
                    <Trigger label={label} value={selected} />
                    <Overlay options={options} onSelect={onSelect} />
                </div>
            )}
        </Dropdown>
    )
}

const Trigger = ({ label, value }) => {
    const [props, { show, toggle }] = useDropdownToggle()

    const onClick = useCallback(() => toggle(!show), [show, toggle])

    const className = useClasses(styles, 'input', { focus: show })

    return (
        <>
            <input className={className} readOnly {...props} onClick={onClick} />
            <div className={styles.values}>{value}</div>
            <label>{label}</label>
            <div className={`${styles.symbol} ${styles.arrow}`} />
        </>
    )
}

const Overlay = ({ options, onSelect }) => {
    const ref = useRef()
    const { show, props } = useDropdownMenu({
        flip: true,
        offset: [0, 0],
    })

    const className = useClasses(overlay, 'container', { show })

    useRefEvent(ref, 'click', (event) => {
        event.stopPropagation()
        event.preventDefault()
    })

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
        <div ref={ref} className={className} {...props}>
            <SelectOption value={null} onSelect={onSelect}>
                All
            </SelectOption>
            {selectOptions}
        </div>
    )
}

const SelectOption = ({ value, children, onSelect }) => {
    const onClick = useCallback(() => onSelect && onSelect(value), [value, onSelect])

    return (
        <div onClick={onClick} className={overlay.option}>
            {children}
        </div>
    )
}
