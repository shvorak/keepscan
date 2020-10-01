import { depositNextPage, depositPageFailed, depositPageLoad, depositPageLoaded } from 'features/deposits/actions'
import { call, cancelled, put, select, takeLatest } from 'redux-saga/effects'
import { loadDepositsPage } from 'features/deposits/requests'
import { fetchDepositById } from 'entities/Deposit/requests'
import { fetchDeposit, fetchDepositFailure, fetchDepositSuccess } from 'entities/Deposit/actions'

export function* startupDepositSaga() {
    yield takeLatest(depositNextPage, loadPagesSaga)
    yield takeLatest(fetchDeposit, fetchDepositSaga)
}

function* loadPagesSaga({ payload }) {
    try {
        const pager = yield select(state => state.features.deposits?.pager)
        console.log(pager)
        const result = yield call(loadDepositsPage, pager.current, pager.take)
        yield put(depositPageLoaded(result.data))
    } catch (e) {
        yield put(depositPageFailed())
    } finally {
        if (yield cancelled()) {
            console.log('cancelled')
        }
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
