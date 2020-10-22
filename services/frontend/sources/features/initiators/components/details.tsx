import React, { FC, useCallback } from 'react'
import styles from './details.less'
import { Heading } from 'uikit/typography'
import { Display } from 'uikit/typography/display'
import { Card, CardBody, CardFilter, CardHead } from 'uikit/layout/card'
import { OperationFilter } from 'features/initiators/components/operations/filter'
import { InitiatorInfo } from 'features/initiators/components/info'
import { useSelector } from 'react-redux'
import { getInitiator } from 'entities/Initiator/queries'

type InitiatorInfoProps = {
    id: string
}

export const InitiatorDetails: FC<InitiatorInfoProps> = ({id, ...props}) => {

    const model = useSelector(getInitiator(id))

    const query = {}

    const onQueryChange = useCallback(query => {
        // TODO:
    }, [])

    return (
        <>
            <div className={styles.title} {...props}>
                <Heading size={1}>Initiator</Heading>
                <Display className={styles.address}>{id}</Display>
            </div>

            <div className={styles.row}>
                <Card>
                    <CardHead>Initiator info</CardHead>
                    <CardBody>
                        <InitiatorInfo data={model} />
                    </CardBody>
                </Card>
            </div>

            <div className={styles.row}>
                <Card>
                    <CardHead>Initiator operations</CardHead>
                    <CardFilter>
                        <OperationFilter query={query} onChange={onQueryChange} />
                    </CardFilter>
                    <CardBody className={styles.operations}>
                        Some info
                    </CardBody>
                </Card>
            </div>
        </>
    )
}
