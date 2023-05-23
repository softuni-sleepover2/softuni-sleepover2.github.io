import * as reservationService from '../data/reservation.js'
import * as roomService from '../data/room.js'
import { html, nothing } from '../libraries/lit-html.js'
import { repeat } from '../libraries/directives/repeat.js'
import { until } from '../libraries/directives/until.js'
import { createSubmitHander } from '../util.js'


const detailsTemplate = (room, hasUser, onDelete, onBook) => html`
<h2>${room.name}</h2>
<p>Location: ${room.location}</p>
<p>Beds: ${room.beds}</p>
${!room.isOwner ? reservationForm(onBook) : nothing }
${room.isOwner ? html`
<a  @click=${onDelete} href = "javascript:void(0)">Delete</a>
<a href = "/edit/${room.objectId}">Edit</a>` 
: nothing}
${hasUser && !room.isOwner ? html`
<h4>Your reservations</h4>
<ul>
    ${room.reservations.length == 0 ? html`<li>You don't have any reservations </li>`
     : html`${repeat(room.reservations, r => r.objectId, reservationCard)}` }
    
</ul>` : nothing}`

const reservationForm = (onSubmit) => html`
<form @submit=${onSubmit}>
<label>From <input type="date" name="startDate"></label>
<label>To <input type="date" name="endDate"></label>
<button>Request reservation</button>
</form>`

const reservationCard = (r)=>  html`

<li>From: ${r.startDate.iso.slice(0,10)} / To: ${r.endDate.iso.slice(0,10)}</li>

`
//<li>From: ${r.startDate.toISOString().slice(0,10)} To: ${r.endDate}</li>

export async function showdetails(ctx) {
    const id = ctx.params.id
    const room = ctx.data
    console.log(ctx.data)
    const hasUser = Boolean(ctx.user)
    room.isOwner = room.owner.objectId == ctx.data?.owner?.objectId && hasUser
    room.reservations = []   // !!!!

    if(hasUser){  //zashtoto v back-end sme pozvolili na registriraniq samo da suzdava bez da chete I VUPREKI TOVA SURVURA NE VRUSHTA GRESHKA
      const result = await reservationService.getByRoomId(id)
      room.reservations = result.results
    }
    ctx.render(detailsTemplate(ctx.data, hasUser, onDelete, createSubmitHander(book)))

    async function onDelete(){
        const choice = confirm('Are you sure')
        if(choice){
            await roomService.deleteRoom(ctx.params.id)
            ctx.page.redirect('/rooms')
        }
    }
    
    async function book({startDate, endDate}){
        if(ctx.user == undefined){
            ctx.page.redirect('/login')
            return
        }
        startDate = new Date(startDate)
        endDate = new Date(endDate)
        
        if(Number.isNaN(startDate.getDate())){
            return alert('Invalid starting date')
        }
        if(Number.isNaN(startDate.getDate())){
            return alert('Invalid ending date')
        }
        if(endDate <= startDate){
            return alert('Ending date must be after starting date')
        }
        const reservationData = {
            startDate,
            endDate,
            host : ctx.data.owner.objectId,
            // room : id
        }
        await reservationService.createReservation(reservationData, id, ctx.user.objectId)
        ctx.page.redirect('/rooms/' + id)
        return alert('Reservation Successful')
    }
}