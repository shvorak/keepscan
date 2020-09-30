import React, { useCallback, useState } from 'react'
import styles from './tdt.css'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Heading } from 'uikit/typography'
import { LotSizeList } from 'features/deposits/components/lot-size'
import { TdtAddress } from 'features/deposits/components/tdt-address'

const LOT_SIZES = [0.001, 0.01, 0.1, 0.2, 0.5, 1]

export const TdtPage = () => {

    const [selected, setSelected] = useState(null)

    const onClick = useCallback(size => setSelected(size), [])

    return (
        <Card>
            <CardHead size={3}>Get random TDT</CardHead>
            <CardBody className={styles.body}>
                <Heading>Select lot size</Heading>
                <LotSizeList variants={LOT_SIZES} selected={selected} onSelect={onClick} />

                <Heading>Your TDT for {selected} lot size</Heading>

                <TdtAddress address="asdasdasdasdasdasdsadasdasdasdasdasasd" />
            </CardBody>
        </Card>
    )
}

