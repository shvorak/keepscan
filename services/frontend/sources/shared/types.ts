

export type Func<R> = () => R
export type Func1<T1, R> = (a: T1) => R
export type Func2<T1, T2, R> = (a: T1, b: T2) => R
export type Func3<T1, T2, T3, R> = (a: T1, b: T2, c: T3) => R

export type Action<T1> = (x: T1) => any
export type Action2<T1, T2> = (a: T1, b: T2) => any
export type Action3<T1, T2, T3> = (a: T1, b: T2, c: T3) => any


export type PagedQuery<T> = {
    page: number
}

export type Paged<T> = {
    items: T[],
    pager: Pager
}
export type Pager = {
    take: number
    total: number
    pages: number
    current: number
}
