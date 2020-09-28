import React, { useMemo } from 'react'
import styles from './index.css'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Placeholder } from 'uikit/display/placeholder'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { format, subDays } from 'date-fns'
import { Heading } from 'uikit/typography'
import { Flex } from 'uikit/layout'

const generateData = () => {
    const now = Date.now()

    return new Array(10).fill(null).map((_, i) => {
        return {
            date: format(subDays(now, 10 - i), 'dd MMM'),
            amount: Math.floor(Math.random() * 600) + 200
        }
    })
}


export const GraphCard = ({ title, children = null }) => {
    const content = children ? children : <Placeholder wide>soon</Placeholder>
    const data = useMemo(() => generateData(), [])
    return (
        <Card className={styles.card}>
            <CardHead stroked={false}>{title}</CardHead>
            <CardBody className={styles.body}>
                <ResponsiveContainer width="100%" height={135}>
                    <BarChart width={200} height={200} data={data}>
                        <Tooltip />
                        <Bar dataKey="amount" fill="#7850cd" />
                        <XAxis dataKey="date" />
                    </BarChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    )
}

export const DepositGraph = ({title}) => {
    const data = useMemo(() => generateData(), [])
    return (
        <Card className={styles.card}>
            <CardHead stroked={false}>{title}</CardHead>
            <CardBody className={styles.body}>
                <ResponsiveContainer width="100%" height={135}>
                    <BarChart width={200} height={200} data={data}>
                        <Tooltip />
                        <Bar dataKey="amount" fill="#48dbb4" />
                        <XAxis dataKey="date" />
                    </BarChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    )
}


