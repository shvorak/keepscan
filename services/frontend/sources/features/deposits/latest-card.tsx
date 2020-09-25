import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getDeposits } from 'entities/Deposit/queries'
import { Card, CardHead, CardList } from 'uikit/layout/card'
import { Deposit } from 'entities/Deposit/types'
import { Address } from 'uikit/crypto/address'
import { ListItem } from 'uikit/data/list'
import { Flex } from 'uikit/layout/flex'
import { DateTime } from 'uikit/display/datetime'

export const DepositCard = () => {
    const deposits = useSelector(getDeposits)

    const depositsList = useMemo(() => {
        return deposits.map((deposit) => <DepositRow key={deposit.id} deposit={deposit} />)
    }, [deposits])

    return (
        <Card>
            <CardHead>Deposits</CardHead>
            <CardList>{depositsList}</CardList>
        </Card>
    )
}

type DepositRowProps = {
    deposit: Deposit
}

const DepositRow: FC<DepositRowProps> = ({ deposit }) => {
    return (
        <ListItem interactive>
            <Flex justifyContent="space-between">
                <div>
                    <Address value={deposit.id} />
                    <DateTime value={deposit.createdAt} secondary />
                </div>
                <Address value={deposit.senderAddress} />
                <Address value={deposit.bitcoinAddress} />
            </Flex>
        </ListItem>
    )
}
