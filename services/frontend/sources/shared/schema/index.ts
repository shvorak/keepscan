import type { FieldOptions } from 'shared/schema/types'

export const field = (name: string, options: FieldOptions) => ({
    name,
    options,
})

