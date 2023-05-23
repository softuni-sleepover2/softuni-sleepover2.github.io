import { html } from "../libraries/lit-html.js"

export const navTemplate = (hasUser) => html`
<nav>
    <a href="/rooms">Rooms</a>
    <a href="/">Home</a>
    ${hasUser 
    ? html`<a href="/create">Create</a>
    <a href="/logout">Logout</a>`  
    : html `<a href="/login">Login</a>
    <a href="/register">Register</a>`}
</nav>`
