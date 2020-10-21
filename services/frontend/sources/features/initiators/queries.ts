import { pathOr } from 'ramda'
import { Initiator } from 'entities/Initiator/types'


export const getInitiatorsList = pathOr<Initiator[]>([], ['features', 'initiators', 'list', 'items'])
