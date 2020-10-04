import { useCallback, useRef, useState } from 'react'
import { equals } from 'ramda'

export const useInput = (defaultValue: any = null) => {
    const [value, setValue] = useState(defaultValue)

    const onChange = useCallback((event) => {
        setValue(extractValue(event))
    }, [])

    return [value, onChange]
}


/**
 * Extracts value from event
 * This is generic helper function for working with inputs
 *
 * TODO: Describe use cases
 *
 * @param event
 */
export const extractValue = event => {
    if (event && event.nativeEvent) {
        // prettier-ignore
        event = event.target.hasOwnProperty('checked')
            ? event.target.checked
            : event.target.value
    }
    return event
}

export const useModel = (defaultValue: any = {}) => {
    const [value, setValue] = useState(defaultValue)

    const callbacks = useRef({})

    // Generates memoized callback functions for given name
    const callbacksFactory = useCallback(name => {
        if (callbacks.current.hasOwnProperty(name) === false) {
            callbacks.current[name] = value => {
                onChange(name, extractValue(value))
            }
        }
        return callbacks.current[name]
    }, [])

    const onChange = useCallback((field, value) => {
        setValue((model) => {
            const updated = { ...model, [field]: value }
            if (false === equals(model, updated)) {
                return updated
            }
            return model
        })
    }, [])

    const onClear = useCallback(() => {
        setValue({})
    }, [])

    return [
        value,
        {
            onChangeField: callbacksFactory,
            onClear
        }
    ]
}
