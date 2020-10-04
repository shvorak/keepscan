import { call, cancelled, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { redeemNextPage, redeemPageFailed, redeemPageLoaded, redeemQueryChanged } from 'features/redeems/actions'
import { fetchRedeem, fetchRedeemFailure, fetchRedeemSuccess } from 'entities/Redeem/actions'
import { loadRedeemsPage } from 'features/redeems/requests'
import { fetchRedeemById } from 'entities/Redeem/requests'

export function* startupRedeemSaga() {
    yield takeEvery(redeemNextPage, loadPagesSaga)
    yield takeLatest(redeemQueryChanged, handleFilterSaga)
    yield takeLatest(fetchRedeem, fetchRedeemSaga)
}

function* loadPagesSaga() {
    try {
        const pager = yield select(state => state.features.redeems?.pager)
        const query = yield select(state => state.features.redeems?.query)
        const result = yield call(loadRedeemsPage, pager.current, pager.take, query)
        yield put(redeemPageLoaded(result.data))
    } catch (e) {
        yield put(redeemPageFailed())
    } finally {
        if (yield cancelled()) {
            // TODO: Cancel
        }
    }
}

function* handleFilterSaga() {
    yield put(redeemNextPage())
}

function* fetchRedeemSaga({ payload }) {
    try {
        const result = yield call(fetchRedeemById, payload)
        yield put(fetchRedeemSuccess(result.data))
    } catch (e) {
        yield put(fetchRedeemFailure(e.message))
    }
}
