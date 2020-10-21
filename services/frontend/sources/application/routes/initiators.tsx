import React from 'react'
import { useParams } from 'react-router-dom'
import { InitiatorList } from 'features/initiators'

export const InitiatorListPage = () => {
    return <InitiatorList />
}

export const InitiatorInfoPage = () => {
    const { id } = useParams<{ id: string }>()

    return <div>Initiator: {id}</div>
}
