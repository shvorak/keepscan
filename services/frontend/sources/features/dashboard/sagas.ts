import { call, fork, put } from 'redux-saga/effects'
import {
    depositsStatLoaded,
    latestDepositsLoaded,
    latestRedeemsLoaded,
    redeemsStatLoaded
} from 'features/dashboard/actions'
import { fetchDepositsStat, fetchRedeemsStat } from 'features/dashboard/requests'
import { fetchLatestRedeems } from 'entities/Redeem/requests'
import { fetchLatestDeposits } from 'entities/Deposit/requests'

export function* dashboardSaga() {
    yield fork(loadRedeemsStat)
    yield fork(loadDepositsStat)
    yield fork(loadLatestRedeems)
    yield fork(loadLatestDeposits)
}

function* loadLatestRedeems() {
    const result = yield call(fetchLatestRedeems)
    yield put(latestRedeemsLoaded(result.data))
}

function* loadLatestDeposits() {
    const result = yield call(fetchLatestDeposits)
    yield put(latestDepositsLoaded(result.data))
}

function* loadRedeemsStat() {
    const result = yield call(fetchRedeemsStat)
    yield put(redeemsStatLoaded(result.data))
}

function* loadDepositsStat() {
    const result = yield call(fetchDepositsStat)
    yield put(depositsStatLoaded(result.data))
}


