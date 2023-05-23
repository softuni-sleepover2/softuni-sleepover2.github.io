import * as roomService from '../data/room.js'
import { html } from '../libraries/lit-html.js'
import { createSubmitHander } from '../util.js'


const createTemplate = (onSubmit) => html`
<h2>Host Room</h2>
<form @submit=${onSubmit}>
    <label>Name: <input type="text" name="name"></label>
    <label>Location: <input type="text" name="location"></label>
    <label>Beds: <input type="text" name="beds"></label>
    <button>Create Room</button>
</form>`

export function showCreate(ctx) {
    ctx.render(createTemplate(createSubmitHander(onSubmit)))

    async function onSubmit({ name, location, beds }, form) {

        beds = parseInt(beds) // v cqlo chislo go prevurni i ako e '' shte vurne NaN
        if (name == '' || location == '' || isNaN(beds)) {
            return alert('All fields are required')
        }
        const userId = ctx.user?.objectId  // ako go nqma hvurli null  i service shte vurne 101 nqma lognat potrebitel
        // inache shte hvurli refferenceError che iskame da dostupim neshto koeto go nqma(ctx.user = undefined.objectId) i shte oburkame potrebitelq s greshka KOQTO OCHAKVAME CHE E VUZMOJNA
        //A GRESHKITE KOITO GI OCHAKVAME GLEDAME DA SE SPRAVIM S TQH BEZ POTREBITELQ DA GIVIDI/ DA ZNAE CHE SA SE SLUCHILI
        //service(back4app) shte hvurli exception i shte kaje che tr da si lognat(authoriziran)  pro greshka 101 moje da prenasochvame kum login str
        const result = await roomService.createRoom({ name, location, beds }, userId)
        ctx.page.redirect('/rooms/' + result.objectId)
    }
}