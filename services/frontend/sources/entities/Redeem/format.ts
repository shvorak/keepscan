import { Redeem } from 'entities/Redeem/types'
import { RedeemStatusNames } from 'entities/Redeem/constants'

export const formatStatus = (redeem: Redeem) => {
    return RedeemStatusNames[redeem.status]
}
