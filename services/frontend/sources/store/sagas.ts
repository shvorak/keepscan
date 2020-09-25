import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { startup } from 'features/startup/actions'
//
// export function* rootSaga() {
//     yield takeLatest(startup, startupSaga)
// }


export default function* startupSaga() {
    yield put(startup('123123'))
    console.log('Startup saga handler')
}
