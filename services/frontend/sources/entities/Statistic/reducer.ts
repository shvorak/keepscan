import { createReducer } from 'shared/reducers'
import { statisticUpdated } from 'entities/Statistic/actions'

export default createReducer({})
    .on(statisticUpdated, (state, { payload }) => payload)
