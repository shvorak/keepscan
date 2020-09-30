import React from 'react'
import styles from './index.css'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { getDepositsStat, getRedeemsStat } from 'features/dashboard/queries'
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent'

export const GraphCard = ({ title, children = null }) => {
    const data = useSelector(getRedeemsStat)
    return (
        <Card className={styles.card}>
            <CardHead stroked={false}>{title}</CardHead>
            <CardBody className={styles.body}>
                <ResponsiveContainer width="100%" height={135}>
                    <BarChart width={200} height={200} data={data}>
                        <Tooltip />
                        <Bar dataKey="volume" fill="#7850cd" />
                        <XAxis dataKey="label" />
                    </BarChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    )
}

export const DepositGraph = ({title}) => {
    const data = useSelector(getDepositsStat)
    return (
        <Card className={styles.card}>
            <CardHead stroked={false}>{title}</CardHead>
            <CardBody className={styles.body}>
                <ResponsiveContainer width="100%" height={135}>
                    <BarChart width={200} height={200} data={data}>
                        <Tooltip content={CustomTooltip} />
                        <Bar dataKey="volume" fill="#48dbb4" />
                        <XAxis dataKey="label" />
                    </BarChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    )
}


const CustomTooltip = (props) => {
    if (!props.active) {
        return null
    }

    const payload = [
        {
            fill: "#48dbb4",
            color: "#48dbb4",
            value: props.payload[0].payload.count,
            name: 'count',
        },
        ...props.payload,
    ]

    return <DefaultTooltipContent {...props} payload={payload} />
};
