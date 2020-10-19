import { ReactElement } from 'react'

export type FieldFunc<T> = <K = keyof T>(name: keyof T) => FieldConfig

export type FieldConfig = {
    name: string
    options: FieldOptions
}

export type FieldOptions = {
    label?: string
    render?: FieldRender,
    payload?: any
    hidden?: (subject: any) => boolean
    visible?: (subject: any) => boolean
}

export type FieldRender = (config: { value: any } & any) => ReactElement

export type SchemaFunc = <T = any>(...builders: FieldFunc<T>[]) => FieldConfig[]

