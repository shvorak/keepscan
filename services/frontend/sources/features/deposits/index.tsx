import React from 'react'
import styles from './index.css'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Placeholder } from '~/uikit/display/placeholder'
import { Redirect, useParams } from 'react-router-dom'
import { getDepositById } from 'entities/Deposit/queries'
import { Deposit } from 'entities/Deposit/types'
import { useSelector } from 'react-redux'


export const DepositList = () => {

    return (
        <Card>
            <CardHead size={3}>Deposits</CardHead>
            <CardBody className={styles.body}>
                <Placeholder wide>
                    very soon
                </Placeholder>
            </CardBody>
        </Card>
    )
}


export const DepositDetails = ({id}) => {
    const deposit: Deposit = useSelector(getDepositById(id))

    if (null == deposit) {
        return <Redirect to="/404" />
    }

    return (
        <Card>
            <CardHead size={3}>Deposit {deposit.id}</CardHead>
            <CardBody className={styles.body}>
                <Placeholder wide>
                    very soon
                </Placeholder>
            </CardBody>
        </Card>
    )
}