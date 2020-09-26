import { useCallback, useMemo } from 'react'

function fixProps(props) {
    Object.keys(props).forEach((prop) => {
        if (typeof props[prop] === 'boolean') {
            props[prop] = props[prop].toString()
        }
    })
}

export const useClasses = (classMap: Record<string, string>, basicClass: string, props: any) => {
    return useMemo(() => {
        // prettier-ignore
        const classes = Object.keys(props)
            .filter(prop =>
                classMap[prop]
                    ? props[prop]
                    : classMap[`${prop}__${props[prop]}`])
            .map((prop) => classMap[prop] || classMap[`${prop}__${props[prop]}`])
            .concat([classMap[basicClass], props.className].filter(Boolean))
        fixProps(props)

        delete props.className

        return classes.join(' ')
    }, [classMap, basicClass, props])
}

export const useStyles = (props: any, aliases: any = {}) => {
    return useMemo(() => {
        return Object.entries(props).reduce((all, [name, value]) => {
            delete props[name]
            return { ...all, [aliases[name] || name]: value }
        }, {})
    }, [props, aliases])
}
