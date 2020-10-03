import { call, delay, fork, put, takeLatest } from 'redux-saga/effects'
import { fetchDepositPage } from 'entities/Deposit/requests'
import { depositPageFetch } from 'entities/Deposit/actions'
import { fetchNetworks } from 'entities/Network/requests'
import { networksFetched } from 'entities/Network/actions'
import { fetchStatistic } from 'entities/Statistic/requests'
import { statisticUpdated } from 'entities/Statistic/actions'
import { dashboardSaga } from 'features/dashboard/sagas'
import { startupDepositSaga } from 'features/deposits/sagas'
import { startupGetTdtSaga } from 'features/get-tdt/sagas'
import { startupRedeemSaga } from 'features/redeems/sagas'

export default function* startupSaga() {
    yield fork(startupNetworks)
    yield fork(startupStatistic)

    yield fork(dashboardSaga)
    yield fork(startupGetTdtSaga)
    yield fork(startupRedeemSaga)
    yield fork(startupDepositSaga)

    yield takeLatest(depositPageFetch, depositsPager)
}

function* startupNetworks() {
    while (true) {
        yield call(networksFetch)
        yield delay(10000)
    }
}

function* networksFetch() {
    const networks = yield call(fetchNetworks)
    yield put(networksFetched(networks.data))
}

function* startupStatistic() {
    const result = yield call(fetchStatistic)
    yield put(statisticUpdated(result.data))
}

function* depositsPager({ payload: { page } }) {
    const result = yield call(fetchDepositPage, page)

    console.log(result)
}

