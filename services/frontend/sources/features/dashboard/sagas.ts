import { call, fork, put } from 'redux-saga/effects'
import { depositsStatLoaded } from 'features/dashboard/actions'
import { fetchDepositsStat } from 'features/dashboard/requests'

export function* dashboardSaga() {
    yield fork(loadDepositsStat)
}

function* loadDepositsStat() {
    const result = yield call(fetchDepositsStat)
    yield put(depositsStatLoaded(result.data))
}
