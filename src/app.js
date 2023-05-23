import { showdetails } from './views/details.js'
import page from './libraries/page.mjs'
import { hasUser, isOwner } from './middleware/guards.js'
import { addPreLoader } from './middleware/preloader.js'
import { addRender } from './middleware/render.js'
import { addSession } from './middleware/session.js'
import { addUserNav } from './middleware/userNav.js'
import { getuserData } from './util.js'
import { showCatalog } from './views/catalog.js'
import { showCreate } from './views/create.js'
import { showHome } from './views/home.js'
import { showLogin } from './views/login.js'
import { logoutAction } from './views/logout.js'
import { navTemplate } from './views/nav.js'
import { showRegister } from './views/register.js'
import { showEdit } from './views/edit.js'

const main = document.querySelector('main')
const header = document.querySelector('header')


//    !!!!  app.js sinhronizira cqloto neshto (zarejda modulite i im predava nujnite el)  !!!!!!!!

// kogato zarejdame modulite kazvame ot kude da doidat dannite!!!
page(addRender(main, header))   // taka promqnata v prilojenieto shte e glavno v app.js
// v drug main el shte mojem da slojim dannite
page(addSession(getuserData)) // taka promqnata v prilojenieto shte e glavno v app.js
// ot fn s drugo ime shte mojem da vzemem userData
page(addUserNav(navTemplate))
page('/', showHome)
page('/rooms', showCatalog)
page('/rooms/:id', addPreLoader('id', 'rooms'), showdetails)
page('/edit/:id', hasUser(), addPreLoader('id', 'rooms'), isOwner(), showEdit)
page('/create', hasUser(), showCreate)   //ako se napishe v url /create se otvarq str ako go nqma guard
page('/login', showLogin)
page('/book/:id', hasUser(), () => console.log('book'))
page('/register', showRegister)
page('/logout', logoutAction)  //vliza v history i kato se dava nazad moje bez da iskame da se logoutnem
//zashtoto kato cuknem back predniq adres e bilo logout i moje da se logoutnem 
page.start()























// import {render, html} from './libraries/lit-html.js'
// import {until} from './libraries/directives/until.js'
// import page from './libraries/page.mjs'


// const languages = {
//     'BG': {
//         greeting : 'Здравей!'
//     },
//     'EN': {
//         greeting : 'Hello!'
//     }
// }

// const local = 'BG' // sprqmo ezika kojto e izbral potrebitelq

// const homeTemplate = (languages) => html`
// <h1>${languages[local].greeting}</h1>`


// async function deplayed(){
//     await new Promise(r => setTimeout(r, 5000))   //prazen promise kojto da se rezolvne sled 5 sec

//     return homeTemplate(languages)
// }

// function home(){
//     render(until(deplayed(), html`<p>Loading...</p>`), document.body)
// }

// page('/', home)
// page.start()