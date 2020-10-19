import React, { ComponentProps, FC } from 'react'
import styles from './drawer.less'
import { useClasses } from 'shared/hooks/styles'
import { Backdrop } from 'uikit/overlay/backdrop'
import { useScrollBlock } from 'uikit/scroll'

type DrawerProps = ComponentProps<'div'> & {
    opened: boolean
    // TODO: TBD other placements
    placement: 'right'

    onClose?: () => any
}

export const Drawer: FC<DrawerProps> = ({ children, onClose, ...props }) => {
    const opened = props.opened
    const className = useClasses(styles, 'root', props)

    useScrollBlock({ vertical: opened })

    return (
        <>
            <Backdrop visible={opened} onClick={onClose} />
            <div className={className} {...props}>
                {children}
            </div>
        </>
    )
}
