export function hasUser(){
    return function(ctx,next){
        if(!ctx.user){
            ctx.page.redirect(`/login`)
        } else{
            next()
        }
    }
}

export function isOwner(){
    return function(ctx, next){
        if(ctx.user.objectId == ctx.data.owner.objectId){
            next()
        } else {
            // ctx.page.redirect('/login')     nqma smisul zashtoto veche si lognatprosto ne si sobstvenik

        }
    }
}