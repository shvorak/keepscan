import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { startup } from 'features/startup/actions'
import { fetchLatestDeposits } from 'entities/Deposit/api'
import { depositFetched } from 'entities/Deposit/actions'
//
// export function* rootSaga() {
//     yield takeLatest(startup, startupSaga)
// }


export default function* startupSaga() {
    yield put(startup('123123'))
    console.log('Startup saga handler')

    const deposits = yield call(fetchLatestDeposits)

    yield put(depositFetched(deposits.data))
}
