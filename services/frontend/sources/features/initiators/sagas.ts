import { call, cancelled, put, select, takeLatest } from 'redux-saga/effects'
import { fetchInitiator, fetchInitiatorPage } from 'features/initiators/requests'
import {
    initiatorFailed,
    initiatorLoad,
    initiatorLoaded,
    initiatorNextPage,
    initiatorPageFailed,
    initiatorPageLoaded,
    initiatorQueryChanged,
} from 'features/initiators/actions'

export function* startupInitiatorSaga() {
    yield takeLatest(initiatorLoad, loadSaga)
    yield takeLatest(initiatorNextPage, loadPagesSaga)
    yield takeLatest(initiatorQueryChanged, handleFilterSaga)
}

function* loadSaga({payload: id}) {
    try {
        const result = yield call(fetchInitiator, id)
        yield put(initiatorLoaded(result.data))
    } catch (e) {
        yield put(initiatorFailed(e.message))
    }

}

function* loadPagesSaga() {
    try {
        const pager = yield select(state => state.features.initiators.list?.pager)
        const query = yield select(state => state.features.initiators.list?.query)
        const result = yield call(fetchInitiatorPage, pager.current, pager.take, query)
        yield put(initiatorPageLoaded(result.data))
    } catch (e) {
        yield put(initiatorPageFailed())
    } finally {
        if (yield cancelled()) {
            // TODO: Cancel
        }
    }
}

function* handleFilterSaga() {
    yield put(initiatorNextPage())
}
