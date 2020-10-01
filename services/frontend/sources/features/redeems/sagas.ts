import { call, cancelled, put, select, takeLatest } from 'redux-saga/effects'
import { redeemNextPage, redeemPageFailed, redeemPageLoaded } from 'features/redeems/actions'
import { loadRedeemsPage } from 'features/redeems/requests'

export function* startupRedeemSaga() {
    yield takeLatest(redeemNextPage, loadPagesSaga)
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
