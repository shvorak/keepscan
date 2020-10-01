import { RedeemStatusNames } from 'entities/Redeem/constants'

export const formatStatus = (status: number) => {
    return RedeemStatusNames[status]
}
