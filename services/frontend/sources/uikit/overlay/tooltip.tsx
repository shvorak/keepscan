import React, { forwardRef, useRef } from 'react'
import styles from './tooltip.less'
import { Overlay } from 'react-overlays'
import { useRefFocus } from 'shared/hooks/common'
import { useClasses } from 'shared/hooks/styles'

export const Tooltip = ({ show, content, children, placement }) => {
    const targetRef = useRef()
    const wrapperRef = useRef()

    const focused = useRefFocus(targetRef)

    const visible = show === undefined ? focused : show

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <div ref={targetRef}>{children}</div>
            <Overlay target={targetRef} offset={[0, 10]} container={wrapperRef} show={visible} placement={placement}>
                {({ placement, arrowProps, props }) => (
                    <div className={styles.tooltip} {...props}>
                        {content}
                        <Arrow placement={placement} {...arrowProps} />
                    </div>
                )}
            </Overlay>
        </div>
    )
}

Tooltip.defaultProps = {
    placement: 'top'
}

const Arrow = forwardRef(({ ...props }: any, ref) => {
    const className = useClasses(styles, 'arrow', props)
    return <div ref={ref as any} className={className} {...props} />
})
