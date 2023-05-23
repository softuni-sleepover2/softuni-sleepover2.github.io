
//za da ne se vurzvame vuv vseki modul s util ili sessionStorage
// taka shte mojem da polzvame modula v proekt v kjto dannite ne se vzimat ot getUserData !!!!!!!!!


// addSession ne znae ot kude idvat dannite a znae samo che tr da zakachi svoistvo user na ctx ako fn vrushta truty stoinost
export function addSession(loadData) {
    // podavame referenciite na fn kum middleware funkciqta koqtoo vzima ctx i next
    return function (ctx, next) {
        const userData = loadData()
        if (userData) {
            ctx.user = userData
        }
        next()
    }
}