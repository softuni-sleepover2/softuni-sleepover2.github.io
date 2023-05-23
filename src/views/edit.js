import * as roomService from '../data/room.js'
import { html } from '../libraries/lit-html.js'
import { createSubmitHander } from '../util.js'


const editTemplate = (room, onSubmit) => html`
<h2>Edit Room</h2>
<form @submit=${onSubmit}>
    <label>Name: <input type="text" name="name" .value=${room.name}></label>
    <label>Location: <input type="text" name="location" .value=${room.location}></label>
    <label>Beds: <input type="text" name="beds" .value=${room.beds}></label>
    <label>Open for booking: <input type="checkbox" name="openForBooking" .checked=${room.openForBooking}></label>
    <button>Submit</button>
</form>`

//.value +> setvame dom stoinostta (da go izpishe direktno v dom durvoto) inache dobavqme samo atributa value v html

export function showEdit(ctx) {
    const id = ctx.params.id
    ctx.render(editTemplate(ctx.data, createSubmitHander(onSubmit)))

    async function onSubmit({ name, location, beds, openForBooking }, form) {
        beds = parseInt(beds)
        openForBooking = Boolean(openForBooking)

        if (name == '' || location == '' || Number.isNaN(beds)) {
            return alert('All fields are required')
        }

        const userId = ctx.user?.objectId
        await roomService.editRoom(id, { name, location, beds, openForBooking }, userId)

        ctx.page.redirect('/rooms/' + id)
    }
}