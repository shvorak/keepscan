import { depositPageFailed, depositPageLoad, depositPageLoaded } from 'features/deposits/actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import { loadDepositsPage } from 'features/deposits/requests'
import { fetchDepositById } from 'entities/Deposit/requests'
import { fetchDeposit, fetchDepositFailure, fetchDepositSuccess } from 'entities/Deposit/actions'

export function* startupDepositSaga() {
    yield takeLatest(depositPageLoad, loadPagesSaga)
    yield takeLatest(fetchDeposit, fetchDepositSaga)
}

function* loadPagesSaga({ payload }) {
    try {
        const result = yield call(loadDepositsPage, payload.page, payload.take)
        yield put(depositPageLoaded(result.data))
    } catch (e) {
        yield put(depositPageFailed())
    }
}

function* fetchDepositSaga({ payload }) {
    try {
        const result = yield call(fetchDepositById, payload)
        yield put(fetchDepositSuccess(result.data))
    } catch (e) {
        yield put(fetchDepositFailure(e.message))
    }
}
