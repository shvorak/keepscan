import React from 'react'
import { Flex } from 'uikit/layout'
import { Dashboard } from 'features/dashboard'

export const Home = () => {
    return (
        <Flex direction="column">
            <Dashboard />
        </Flex>
    )
}
