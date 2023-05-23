import { clearuserData, setuserData } from "../util.js";
import { get, post } from "./api.js";


const endpoints= {
    'login' : '/login',
    'logout' : '/logout',
    'register' : '/users'
}

export async function register(email, username, password){
    const { sessionToken, objectId } = await post(endpoints.register, {email, username, password})
    const userData = {
        email,
        objectId,
        username,
        sessionToken
    }

    setuserData(userData)
}

export async function login(email, password){
    const {username, objectId, sessionToken} = await post(endpoints.login, {email, password})
    const userData = {
        email,
        objectId,
        username,
        sessionToken
    }
    
    setuserData(userData)
}

export async function logout(){
   // const result = get('/logout')
    clearuserData()
// console.log(result)
}