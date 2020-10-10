import React from 'react'
import type { FieldConfig, FieldRender } from 'shared/schema/types'

export const getLabel = (field: FieldConfig): string => {
    return field.options.label ?? field.name
}

export const getRender = (field: FieldConfig): FieldRender => {
    return field.options.render ? field.options.render : ({ value }) => <>{value}</>
}


export const isVisible = (field: FieldConfig, subject: any) => {
    const { visible, hidden } = field.options
    if (visible && hidden) {
        throw new Error("Use one of `visible` or `hidden` functions")
    }
    if (hidden) {
        return !hidden(subject)
    }
    if (visible) {
        return visible(subject)
    }
    return true
}
