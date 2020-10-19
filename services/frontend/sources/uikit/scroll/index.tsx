import React, { ComponentProps, createContext, FC, useContext, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import styles from './index.less'
import { useScrollbarWidth } from 'react-use'

type ScrollAreaProps = ComponentProps<'div'>

type ScrollAreaContextState = {
    verticalBlocked: boolean
    block(vertical: boolean)
}

const ScrollAreaContext = createContext<ScrollAreaContextState>(null)

export const ScrollArea: FC<ScrollAreaProps> = ({ children, className, style: outerStyle, ...props }) => {
    const [state, setState] = useState<Partial<ScrollAreaContextState>>({})

    const scrollWidth = useScrollbarWidth()

    const value = useMemo(() => {
        return {
            verticalBlocked: state.verticalBlocked,

            block: (vertical: boolean) => {
                setState((state) => ({ ...state, verticalBlocked: vertical }))
            },
        }
    }, [state])

    const style = useMemo(() => {
        const styles = Object.assign({}, outerStyle)
        if (state.verticalBlocked) {
            Object.assign(styles, {
                paddingRight: scrollWidth,
                overflow: 'hidden'
            })
        }

        return styles
    }, [state, scrollWidth])

    return (
        <ScrollAreaContext.Provider value={value}>
            <div className={classNames(className, styles.area)} style={style} {...props}>
                {children}
            </div>
        </ScrollAreaContext.Provider>
    )
}

export const useScrollArea = () => {
    const ctx = useContext(ScrollAreaContext)

    if (null === ctx) {
        throw new Error('Use `useScrollArea` with `ScrollArea` as a parent component')
    }
}

export const useScrollBlock = ({ vertical }) => {
    const ctx = useContext(ScrollAreaContext)

    if (null === ctx) {
        throw new Error('Use `useScrollBlock` with `ScrollArea` as a parent component')
    }

    useEffect(() => {
        ctx.block(vertical)
    }, [vertical])

    return useMemo(() => {
        return {
            vertical: ctx.verticalBlocked,
        }
    }, [ctx])
}
