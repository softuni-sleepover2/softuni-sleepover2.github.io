import { html } from '../libraries/lit-html.js'
import { repeat } from '../libraries/directives/repeat.js'
import { classMap } from '../libraries/directives/class-map.js'
import * as roomService from '../data/room.js'


const catalogTemplate = (list) => html`
<h2>Available rooms</h2>
${list}`

const listTemplate = (rooms) => html`
<section>
    ${repeat(rooms, r => r.objectId, roomCard)}
</section>`
// r => r.objectId
//vrushta unikalna stoinost za vseki el(objectId) za da moje
// interpretatora na lit-html pri sledvashto rendene na str da si pogledne v spisuka i da vidi dali obeka veche ne e
// renden vednuj => ako e shtezameni samo nego

const roomCard = (room) => html`
<article class=${classMap({ "room-card": true, 'own-room': room.isOwner })}>
    <h3>${room.name}</h3>
    <p>Location: ${room.location}</p>
    <p>Beds: ${room.beds}</p>
    <p>Creator: ${room.owner.username}</p>
    <p> <a href="/rooms/${room.objectId}">View Details</a></p>
</article>`


export async function showCatalog(ctx) {
    ctx.render(catalogTemplate(html`<p>Loading &hellip;</p>`))

    const user = ctx.user ? ctx.user.objectId : false
    const { results: rooms } = await roomService.getrooms(user)
    console.log(rooms)
    if (ctx.user) {
        rooms.forEach(room => room.isOwner = room.owner.objectId == ctx.user.objectId);
    }

    ctx.render(catalogTemplate(listTemplate(rooms)))
}