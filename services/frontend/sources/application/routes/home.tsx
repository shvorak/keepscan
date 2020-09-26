import React from 'react'
import { Flex, View } from 'uikit/layout'
import { DepositCard } from 'features/deposits/latest-card'
import { RedeemCard } from 'features/redeem/latest-card'

export const Home = () => {
    return (
        <Flex>
            <Flex grow={1}>
                <DepositCard />
            </Flex>

        </Flex>
    )
}
