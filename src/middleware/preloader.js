import { html } from '../libraries/lit-html.js'
import * as roomServise from '../data/room.js'
import { until } from '../libraries/directives/until.js'



export function addPreLoader(param, collection) {

    return async function (ctx, next) {
        const id = ctx.params[param]

        if (id) {
            const data = await roomServise.getById(id)
            ctx.data = data
        }

        next()
    }
}