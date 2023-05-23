import { getuserData } from "../util.js"

const host = 'https://parseapi.back4app.com'
const appId = 'DsMSrB6RnceSz3Ya6P8dhPAHRc0A5ebLawtE4RXw'  //id na application
const jsApiKey = 'D5wjspi7xghL9lZwVvGOiLaohSPkjJShQnkQcIx0'


async function request(method, url, data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': appId,
            'X-Parse-JavaScript-Key': jsApiKey
        }
    }

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data)
    }

    const user = getuserData()

    if (user) {
        options.headers['X-Parse-Session-Token'] = user.sessionToken
    }

    try {
        const response = await fetch(host + url, options)

        if (response.status == 204) {
            return response
        }
        
        //IZOBSHTO NQMA DA IZPISHE GRESHKA a shte prenasochi kum login(registriraj se za da napravish tova)
        // if(response.status == 101){
        //  page(redirect('/login'))
        // }
        const result = await response.json()
        if (response.ok !== true) {
            throw new Error(result.message || result.error)
        }
        return result

    } catch (err) {
        alert(err.message)
        throw err
    }
}

export const get = request.bind(null, 'get')
export const post = request.bind(null, 'post')
export const put = request.bind(null, 'put')
export const del = request.bind(null, 'delete')