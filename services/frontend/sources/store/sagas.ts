import { call, fork, put, delay } from 'redux-saga/effects'
import { fetchLatestDeposits } from 'entities/Deposit/api'
import { depositFetched } from 'entities/Deposit/actions'
import { fetchNetworks } from 'entities/Network/api'
import { networksFetched } from 'entities/Network/actions'

export default function* startupSaga() {
    yield fork(startupNetworks)
    yield fork(startupDeposits)
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
