import { register } from "../data/users.js";
import { html } from "../libraries/lit-html.js";
import { createSubmitHander } from "../util.js";

const template = (onSubmit) => html`
<h2>Register</h2>
<form @submit=${onSubmit}>
    <label>Email: <input type="text" name="email"></label>
    <label>Username: <input type="text" name="username"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat Password: <input type="password" name="repass"></label>
    <button>Submit</button>
</form>
`

export function showRegister(ctx) {
    ctx.render(template(createSubmitHander(onSubmit)))

    async function onSubmit({ email, username,  password, repass }) {
        if (email == '' || password == "" || username == '') { 
            return alert('All fields are required')
        }

        if(password !== repass) {
            return alert('Passwords should match!')
        }

        await register(email, username,  password)
        ctx.page.redirect('/rooms')
    }
}