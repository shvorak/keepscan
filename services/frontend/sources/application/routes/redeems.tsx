import React from 'react'
import { useParams } from 'react-router-dom'
import { RedeemDetails } from 'features/redeems'

export { RedeemList as RedeemListPage } from 'features/redeems'

export const RedeemDetailsPage = () => {
    const { id } = useParams<{ id: string }>()

    return <RedeemDetails id={id} />
}
