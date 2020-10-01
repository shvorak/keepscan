import { call, cancelled, put, select, takeLatest } from 'redux-saga/effects'
import { redeemNextPage, redeemPageFailed, redeemPageLoaded } from 'features/redeems/actions'
import { fetchRedeem, fetchRedeemFailure, fetchRedeemSuccess } from 'entities/Redeem/actions'
import { loadRedeemsPage } from 'features/redeems/requests'
import { fetchRedeemById } from 'entities/Redeem/requests'

export function* startupRedeemSaga() {
    yield takeLatest(redeemNextPage, loadPagesSaga)
    yield takeLatest(fetchRedeem, fetchRedeemSaga)
}

function* loadPagesSaga() {
    try {
        const pager = yield select(state => state.features.redeems?.pager)
        const result = yield call(loadRedeemsPage, pager.current, pager.take)
        yield put(redeemPageLoaded(result.data))
    } catch (e) {
        yield put(redeemPageFailed())
    } finally {
        if (yield cancelled()) {
            // TODO: Cancel
        }
    }
}

function* fetchRedeemSaga({ payload }) {
    try {
        const result = yield call(fetchRedeemById, payload)
        yield put(fetchRedeemSuccess(result.data))
    } catch (e) {
        yield put(fetchRedeemFailure(e.message))
    }
}
