import { Deposit } from 'entities/Deposit/types'
import { DepositStatusNames } from 'entities/Deposit/constants'



export const formatStatus = (deposit: Deposit) => {
    return DepositStatusNames[deposit.status]
}
