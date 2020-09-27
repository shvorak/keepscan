import React from 'react'
import styles from './index.css'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'
import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts'

const DataMock = [
    { date: '25 Sep', amount: 350 },
    { date: '26 Sep', amount: 200 },
    { date: '27 Sep', amount: 674 },
    { date: '28 Sep', amount: 230 },
    { date: '29 Sep', amount: 454 },
    { date: '30 Sep', amount: 600 },
]

export const GraphCard = ({ title, children = null }) => {
    const content = children ? children : <Placeholder wide>soon</Placeholder>

    return (
        <Card className={styles.card}>
            <CardHead stroked={false}>{title}</CardHead>
            <CardBody className={styles.body}>
                <ResponsiveContainer width="100%" height={135}>
                    <BarChart width={200} height={200} data={DataMock}>
                        <Bar dataKey="amount" fill="#7850cd" />
                        <XAxis dataKey="date" />
                    </BarChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    )
}
