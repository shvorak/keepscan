import { call, fork, put, delay, takeLatest } from 'redux-saga/effects'
import { fetchDepositPage, fetchLatestDeposits } from 'entities/Deposit/api'
import { depositFetched, depositPageFetch } from 'entities/Deposit/actions'
import { fetchNetworks } from 'entities/Network/api'
import { networksFetched } from 'entities/Network/actions'
import { fetchStatistic } from 'entities/Statistic/requests'
import { statisticUpdated } from 'entities/Statistic/actions'

export default function* startupSaga() {
    yield fork(startupNetworks)
    yield fork(startupDeposits)
    yield fork(startupStatistic)
    yield takeLatest(depositPageFetch, depositsPager)
}

function* startupNetworks() {
    const networks = yield call(fetchNetworks)
    yield put(networksFetched(networks.data))
}

function* startupDeposits() {
    const deposits = yield call(fetchLatestDeposits)
    // yield delay(5000)
    yield put(depositFetched(deposits.data))
}

function* startupStatistic() {
    const result = yield call(fetchStatistic)
    yield put(statisticUpdated(result.data))
}

function* depositsPager({ payload: { page } }) {
    const result = yield call(fetchDepositPage, page)

    console.log(result)
}

