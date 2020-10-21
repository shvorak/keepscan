import React from 'react'
import { useParams } from 'react-router-dom'
import { InitiatorList } from 'features/initiators'
import { InitiatorDetails } from 'features/initiators/components/details'

export const InitiatorListPage = () => {
    return <InitiatorList />
}

export const InitiatorInfoPage = () => {
    const { id } = useParams<{ id: string }>()

    return <InitiatorDetails id={id} />
}
