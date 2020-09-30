import { fetchTdt, fetchTdtFailure, fetchTdtSuccess } from 'features/deposits/actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import { fetchTdtId } from 'features/deposits/requests'
import { is } from 'ramda'

export function* startupDepositSaga() {
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
