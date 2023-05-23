import { login } from "../data/users.js";
import { html } from "../libraries/lit-html.js";
import { createSubmitHander } from "../util.js";

const template = (onSubmit) => html`
<h2>Login</h2>
<form @submit=${onSubmit}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <button>Login</button>
</form>
`

export function showLogin(ctx) {
    ctx.render(template(createSubmitHander(onSubmit)))

    async function onSubmit({ email, password }) {
        if (email == '' || password == "") { 
            return alert('All fields are required')
        }

        await login(email, password)
        ctx.page.redirect('/rooms')
    }
}