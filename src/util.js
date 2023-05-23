export function setuserData(data) {
    sessionStorage.setItem('userdata', JSON.stringify(data))
}

export function getuserData() {
    return JSON.parse(sessionStorage.getItem('userdata'))
}

export function clearuserData() {
    sessionStorage.removeItem('userdata')
}

export function createPointer(className, objectId) {
    return { "__type": "Pointer", className, objectId }
}

export function addOwner(record, userId) {
    //za da ne modificirame zapisa suzdavame nov obekt
    const roomData = Object.assign({}, record)
    roomData.owner = createPointer('_User', userId)
    return roomData
}

export function createSubmitHander(callback) {
    return function (ev) {
        ev.preventDefault()
        const formData = new FormData(ev.target)
        const data = Object.fromEntries([...formData].map(([k, v]) => [k, v.trim()]))
        return callback(data, ev.target)
    }
}

export function filterRelation(field, collection, objectId) {
    const relation = {
        [field]: createPointer(collection, objectId)
    }
    return relation
}

export function encodeDate(date){
    return { __type: 'Date', iso: date.toISOString()}
}

export function encodeObject(object){
    return encodeURIComponent(JSON.stringify(object))
}