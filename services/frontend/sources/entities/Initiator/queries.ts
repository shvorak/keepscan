import { Initiator } from 'entities/Initiator/types'


export const getInitiator = (id: string) => (): Initiator => ({
    id: '0x3eba91fbff9793d4d1da9f71272020773d0e537c',
    depositCount: 130,
    depositAmount: 240,
    redeemCount: 32,
    redeemAmount: 42,
    lastSeenAt: '2020-10-20T10:15:21Z'
})
