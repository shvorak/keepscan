import React from 'react'
import { useParams } from 'react-router-dom'
import { DepositDetails } from 'features/deposits/components/details'

export { DepositList as DepositListPage } from 'features/deposits'


export const DepositDetailsPage = () => {

    const {id } = useParams<{id: string}>()

    return (
        <DepositDetails id={id} />
    )
}
