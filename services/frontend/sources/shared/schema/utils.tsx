import React from 'react'
import { FieldConfig, FieldRender } from 'shared/schema/types'

export const getLabel = (field: FieldConfig): string => {
    return field.options.label ?? field.name
}

export const getRender = (field: FieldConfig): FieldRender => {
    return field.options.render ? field.options.render : ({ value }) => <>{value}</>
}
