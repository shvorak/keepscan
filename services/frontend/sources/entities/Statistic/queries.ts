import { pathOr } from 'ramda'
import { StatisticDto } from 'entities/Statistic/types'

export const getStatistic = pathOr<StatisticDto>({}, ['entities', 'statistic'])
