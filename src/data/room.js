import { addOwner, createPointer, encodeObject, filterRelation } from '../util.js'
import { get, post, put, del } from './api.js'

const endpoints = {
    'roomsWithUser': (userId) => `/classes/Room?where=${encodeURIComponent(`{"$or":[{"openForBooking":true},{"owner":{"__type":"Pointer","className":"_User","objectId":"${userId}"}}]}`)}&include="owner"`,
    //'rooms' : (userId)=> `/classes/Room?where=${encodeURIComponent(`{"$or":[{"openForBooking":true},{"owner":${JSON.stringify(createPointer('_User', userId))}}]}`)}`,
    //'rooms': (userId) => `/classes/Room?where=${encodeObject({ $or: [{ openForBooking: true }, filterRelation('owner', '_User', userId)] })}`,
    'rooms': `/classes/Room?where={"openForBooking":true}&include="owner"`,
    byId: (id) => `/classes/Room/${id}`,
    createroom: `/classes/Room`
}
export async function getrooms(user) {
    if (!user) {
        return get(endpoints.rooms)
    }
    return get(endpoints.roomsWithUser(user))
}

export async function getById(id) {
    return get(endpoints.byId(id))
}

export async function createRoom(data, userId) {
    return post(endpoints.createroom, addOwner(data, userId))
}

export async function editRoom(id, data, userId) {
    return put(endpoints.byId(id), addOwner(data, userId))
}

export async function deleteRoom(id) {
    return del(endpoints.byId(id))
}