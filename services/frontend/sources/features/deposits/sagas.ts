import { call, cancelled, put, select, takeLatest } from 'redux-saga/effects'
import { loadDepositsPage } from 'features/deposits/requests'
import { fetchDepositById } from 'entities/Deposit/requests'
import { depositNextPage, depositPageFailed, depositPageLoaded, depositQueryChanged } from 'features/deposits/actions'
import { fetchDeposit, fetchDepositFailure, fetchDepositSuccess } from 'entities/Deposit/actions'

export function* startupDepositSaga() {
    yield takeLatest(depositNextPage, loadPagesSaga)
    yield takeLatest(depositQueryChanged, handleFilterSaga)
    yield takeLatest(fetchDeposit, fetchDepositSaga)
}

function* loadPagesSaga() {
    try {
        const pager = yield select(state => state.features.deposits?.pager)
        const query = yield select(state => state.features.deposits?.query)

        console.log(pager, query)

        const result = yield call(loadDepositsPage, pager.current, pager.take, query)
        yield put(depositPageLoaded(result.data))
    } catch (e) {
        yield put(depositPageFailed())
    } finally {
        if (yield cancelled()) {
            // TODO: Cancel
        }
    }
}

function* handleFilterSaga() {
    yield put(depositNextPage())
}


function* fetchDepositSaga({ payload }) {
    try {
        const result = yield call(fetchDepositById, payload)
        yield put(fetchDepositSuccess(result.data))
    } catch (e) {
        yield put(fetchDepositFailure(e.message))
    }
}
