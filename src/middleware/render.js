import { render } from "../libraries/lit-html.js"

export function addRender(main, nav){  //konfiguraciqta priema referenciqta kum main el

    // podavame referenciite na el kum middleware funkciqta koqtoo vzima ctx i next
    return function(ctx, next) {
        ctx.render = renderMain
        ctx.renderNav = renderNav
        next()
    }
    function renderMain(content){
        render(content, main)
    }
    function renderNav(content){
        render(content, nav)
    }
}