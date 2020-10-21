import rest from 'shared/rest'

export const fetchInitiatorById = (id: string) => rest.get(`/initiator/${id}`)
