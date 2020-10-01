import { Deposit } from 'entities/Deposit/types'
import { DepositStatusNames } from 'entities/Deposit/constants'



export const formatStatus = (status: number) => {
    return DepositStatusNames[status]
}
