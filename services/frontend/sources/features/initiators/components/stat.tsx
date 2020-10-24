import React, { ComponentProps, FC, useMemo } from 'react'
import styles from './stat.less'
import { Initiator } from 'entities/Initiator/types'
import { useClasses } from 'shared/hooks/styles'
import { Number } from 'uikit/display/number'
import { Amount } from 'uikit/crypto/amount'

type InitiatorStatProps = {
    data: Initiator
}

export const InitiatorStat: FC<InitiatorStatProps> = ({ data, ...props }) => {
    const redeems = data.redeemsAmount || 0
    const deposits = data.depositsAmount || 0

    const depositWidth = deposits * 1000 + 1
    const redeemWidth = redeems * 1000 + 1

    return (
        <div className={styles.root} {...props}>
            <div className={styles.values}>
                <div className={styles.values_item}>
                    <Number value={data.depositsCount} />
                    <Amount value={deposits} />
                </div>
                <div className={styles.values_item}>
                    <Number value={data.redeemsCount} />
                    <Amount value={redeems} />
                </div>
            </div>
            <div className={styles.progress}>
                <ProgressItem width={depositWidth} className={styles.stack__deposit} muted={deposits === 0} />
                <ProgressItem width={redeemWidth} className={styles.stack__redeem} muted={redeems === 0} />
            </div>
        </div>
    )
}

type ProgressPartProps = ComponentProps<'div'> & {
    width: number
    muted?: boolean
}

const ProgressItem: FC<ProgressPartProps> = ({ width, style: baseStyle, ...props }) => {
    const style = useMemo(
        () =>
            Object.assign({}, baseStyle || {}, {
                flexGrow: width,
            }),
        [width]
    )

    const className = useClasses(styles, 'progress_item', props)

    // TODO: Fix later. Without this React will throw error in dev mode
    delete props.muted

    return <div className={className} style={style} {...props} />
}
