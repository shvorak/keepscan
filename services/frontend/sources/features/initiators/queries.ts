import { pathOr } from 'ramda'
import { Initiator } from 'entities/Initiator/types'
import { Pager, Query } from 'shared/types'


export const getInitiatorsList = pathOr<Initiator[]>([], ['features', 'initiators', 'list', 'items'])
export const getInitiatorsPager = pathOr<Pager>(null , ['features', 'initiators', 'list', 'pager'])
export const getInitiatorsQuery = pathOr<Query>({} , ['features', 'initiators', 'list', 'query'])
