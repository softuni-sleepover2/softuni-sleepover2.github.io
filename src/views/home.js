import { login } from "../data/users.js";
import { html } from "../libraries/lit-html.js";
import { createSubmitHander } from "../util.js";

const template =  html`
<h2>Welcome to Softuni Sleepover!</h2>
<p>Find accomodation in any location! <a href="/rooms">Browse catalog</a> </p>
<p>Have a room to offer? Place one right now <a href="/create"> Add room </a> </p>
`

export function showHome(ctx) {
    ctx.render(template)
}