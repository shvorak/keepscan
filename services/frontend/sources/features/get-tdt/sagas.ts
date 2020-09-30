import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchTdtId } from 'features/get-tdt/requests'
import { is } from 'ramda'
import { fetchTdt, fetchTdtFailure, fetchTdtSuccess } from 'features/get-tdt/actions'

export function* startupGetTdtSaga() {
    yield takeLatest(fetchTdt, fetchTdtSaga)
}

function* fetchTdtSaga({payload}) {
    try {
        const result = yield call(fetchTdtId, payload)
        if (is(Object, result.data)) {
            yield put(fetchTdtSuccess(result.data))
        } else {
            yield put(fetchTdtFailure())
        }
    } catch (e) {
        yield put(fetchTdtFailure())
    }
}
