import type { FieldOptions } from 'shared/schema/types'

export const field = <T>(name: string, options: FieldOptions) => ({
    name,
    options,
})

