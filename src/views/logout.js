import { logout } from "../data/users.js";

export function logoutAction(ctx){
    logout()
    ctx.page.redirect('/')
}