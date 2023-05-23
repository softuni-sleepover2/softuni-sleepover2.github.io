import { addOwner, createPointer, encodeDate } from "../util.js"
import { get, post } from "./api.js"

const endpoints = {
    'reservations': (roomId) => `/classes/Reservation?where=${encodeURIComponent(`{"room" : ${JSON.stringify(createPointer('Room', roomId))}}`)}` + '&include=owner',
    'reserve': '/classes/Reservation'
}

export async function getByRoomId(roomId) {
    const data = await get(endpoints.reservations(roomId))
    // data.results.forEach(r => {      //zashtoto datata e v ISOString format a ni trqbva da e kato data posle v koda (parsvame go otnovo kato data)
    //     r.startDate = new Date(r.startDate.iso)
    //     r.endDate = new Date(r.endDate.iso)
    // });
    return data
}
export async function createReservation(data, roomId, userId) {
    const roomData = addOwner(data, userId)
    roomData.room = createPointer('Room', roomId)
    roomData.host = createPointer('_User', roomData.host)

    roomData.startDate = encodeDate(roomData.startDate)
    roomData.endDate = encodeDate(roomData.endDate)
   
    await post(endpoints.reserve, roomData)
}

