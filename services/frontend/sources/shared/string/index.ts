export const ellipsis = (leadCount: number, tailCount: number, value: string, separator: string = '...') =>
    [value.toString().substr(0, 6), value.toString().substr(-4)].join(separator)
