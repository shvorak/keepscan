import { call, delay, fork, put } from 'redux-saga/effects'
import {
    exchangeRateLoaded,
    latestDepositsLoaded,
    latestRedeemsLoaded,
    operationsStatLoaded,
    supplyStatLoaded
} from 'features/dashboard/actions'

import { fetchExchangeRate, fetchOperationsStat, fetchSupplyStat } from 'features/dashboard/requests'
import { fetchLatestRedeems } from 'entities/Redeem/requests'
import { fetchLatestDeposits } from 'entities/Deposit/requests'

export function* dashboardSaga() {
    yield fork(loadSupplyStat)
    yield fork(loadExchangeRate)
    yield fork(loadLatestRedeems)
    yield fork(loadLatestDeposits)
    yield fork(loadOperationsStat)
}

const DELAY = 20000

function* loadLatestRedeems() {
    while (true) {
        const result = yield call(fetchLatestRedeems)
        yield put(latestRedeemsLoaded(result.data))
        yield delay(DELAY)
    }
}
function* loadExchangeRate() {
    while (true) {
        const result = yield call(fetchExchangeRate)
        yield put(exchangeRateLoaded(result.data))
        yield delay(DELAY)
    }
}

function* loadLatestDeposits() {
    while (true) {
        const result = yield call(fetchLatestDeposits)
        yield put(latestDepositsLoaded(result.data))
        yield delay(DELAY)
    }
}

function* loadSupplyStat() {
    while (true) {
        const result = yield call(fetchSupplyStat)
        yield put(supplyStatLoaded(result.data))
        yield delay(DELAY)
    }
}

function* loadOperationsStat() {
    while (true) {
        const result = yield call(fetchOperationsStat)
        yield put(operationsStatLoaded(result.data))
        yield delay(DELAY)
    }
}

