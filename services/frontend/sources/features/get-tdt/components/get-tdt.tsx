import React, { useCallback, useEffect, useState } from 'react'
import styles from './get-tdt.css'
import { Heading } from 'uikit/typography'
import { LotSizeList } from 'features/get-tdt/components/lot-size'
import { TdtAddress } from 'features/get-tdt/components/tdt-address'
import { useAction } from 'shared/hooks/redux'
import { useSelector } from 'react-redux'
import { Placeholder } from 'uikit/display/placeholder'
import { Display } from 'uikit/typography/display'
import { fetchTdt } from 'features/get-tdt/actions'
import { getTdtAddress, getTdtFailure, getTdtLoading } from 'features/get-tdt/queries'
import { LOT_SIZES } from '~/application/env'

export const GetTdt = () => {
    const [selected, setSelected] = useState(null)

    const getTdt = useAction(fetchTdt)
    const loading = useSelector(getTdtLoading)
    const address = useSelector(getTdtAddress)
    const failure = useSelector(getTdtFailure)

    const onClick = useCallback((size) => {
        setSelected(size)
        getTdt(size)
    }, [])

    const content = loading ? (
        <Loading />
    ) : failure ? (
        <Failure selected={selected} />
    ) : address ? (
        <>
            <Heading className={styles.heading}>Your random TDT ID for {selected} lot size</Heading>
            <TdtAddress address={address} />
        </>
    ) : null

    return (
        <>
            <Heading className={styles.heading}>Select lot size</Heading>
            <LotSizeList variants={LOT_SIZES} selected={selected} onSelect={onClick} />

            <div className={styles.content}>{content}</div>
        </>
    )
}

const Loading = () => (
    <Placeholder visible>loading</Placeholder>
)

const Failure = ({selected}) => (
    <Placeholder>
        <Heading size={3}>Ooooops :(</Heading>
        <Display>Looks like there no TDT for {selected} lot size</Display>
    </Placeholder>
)
