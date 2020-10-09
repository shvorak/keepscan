import React from 'react'
import styles from './index.css'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHead } from 'uikit/layout/card'
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { getOperationsStat, getSupplyStat } from 'features/dashboard/queries'
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent'

export const SupplyChangeCard = ({ title, children = null }) => {
    const data = useSelector(getSupplyStat)
    return (
        <Card className={styles.card}>
            <CardHead stroked={false} className={styles.head}>
                {title}
            </CardHead>
            <CardBody className={styles.body}>
                <ResponsiveContainer width="100%" height={170}>
                    <LineChart width={200} height={200} data={data}>
                        <Tooltip />
                        <Line type="monotone" dataKey="minted" name="Minted" stroke="#48dbb4" strokeWidth={2} />
                        <Line type="monotone" dataKey="supply" name="Supply" stroke="#7850cd" strokeWidth={2} />
                        <XAxis dataKey="label" />
                    </LineChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    )
}

export const OperationsGraph = ({ title }) => {
    const data = useSelector(getOperationsStat)
    return (
        <Card className={styles.card}>
            <CardHead stroked={false} className={styles.head}>{title}</CardHead>
            <CardBody className={styles.body}>
                <ResponsiveContainer width="100%" height={170}>
                    <BarChart width={200} height={200} data={data}>
                        <Tooltip content={CustomTooltip} />
                        <Bar dataKey="depositsVolume" name="Deposits volume" fill="#48dbb4" />
                        <Bar dataKey="redeemsVolume" name="Redeems volume" fill="#7850cd" />
                        <XAxis dataKey="label" />
                    </BarChart>
                </ResponsiveContainer>
            </CardBody>
        </Card>
    )
}

const CustomTooltip = (props) => {
    if (!props.active || !props.payload) {
        return null
    }

    const payload = props.payload.reduce((params, param) => {
        const name = param.name.replace('volume', 'count')
        const dataKey = param.dataKey.replace('Volume', 'Count')

        return [
            ...params,
            {
                fill: param.color,
                color: param.color,
                value: param.payload[dataKey],
                name: name,
            },
            param,
        ]
    }, [])

    return <DefaultTooltipContent {...props} payload={payload} />
}
