import React, { FC, useEffect } from 'react'
import styles from './details.less'
import { Heading } from 'uikit/typography'
import { Display } from 'uikit/typography/display'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { InitiatorInfo } from 'features/initiators/components/info'
import { useSelector } from 'react-redux'
import { useAction } from 'shared/hooks/redux'
import { initiatorLoad } from 'features/initiators/actions'
import { getInitiator } from 'features/initiators/queries'
import { Loading } from 'uikit/display/loading'
import { OperationList } from 'features/initiators/components/operations/list'

type InitiatorInfoProps = {
    id: string
}

export const InitiatorDetails: FC<InitiatorInfoProps> = ({id, ...props}) => {
    const load = useAction(initiatorLoad)
    const model = useSelector(getInitiator(id))

    useEffect(() => {
        load(id)
    }, [id])



    if (model == null) {
        return <Loading />
    }

    return (
        <>
            <div className={styles.title} {...props}>
                <Heading size={1}>Initiator</Heading>
                <Display className={styles.address}>{id}</Display>
            </div>

            <div className={styles.row}>
                <Card>
                    <CardHead>Initiator Info</CardHead>
                    <CardBody>
                        <InitiatorInfo data={model} />
                    </CardBody>
                </Card>
            </div>

            <div className={styles.row}>
                <OperationList initiatorId={id} />
            </div>
        </>
    )
}
