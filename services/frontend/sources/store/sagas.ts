import { call, fork, put, takeLatest } from 'redux-saga/effects'
import { fetchDepositPage, fetchLatestDeposits } from 'entities/Deposit/requests'
import { depositFetched, depositPageFetch } from 'entities/Deposit/actions'
import { fetchNetworks } from 'entities/Network/requests'
import { networksFetched } from 'entities/Network/actions'
import { fetchStatistic } from 'entities/Statistic/requests'
import { statisticUpdated } from 'entities/Statistic/actions'
import { dashboardSaga } from 'features/dashboard/sagas'

export default function* startupSaga() {
    yield fork(startupNetworks)
    yield fork(startupDeposits)
    yield fork(startupStatistic)

    yield fork(dashboardSaga)

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

