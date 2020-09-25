import { is, pathOr } from 'ramda'

export const queryList = (path: string) => (state: any) => {
    let value = pathOr([], path.split('.'), state)

    if (is(Object, value)) {
        value = Object.values(value)
    }

    if (is(Array, value)) {
        return value
    }

    console.warn(`Path ${path} doesn't contains array or object`)

    return []
}

