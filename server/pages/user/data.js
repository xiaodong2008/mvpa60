const {db} = require('../../database')
const {dbError} = require("../../main");

async function data(r) {
    // method
    if (r.method !== 'GET') return r.sendJson({success: false, message: "Invalid method"})

    const session = r.query.session

    let login = await db.from('userlogin').select().eq('session', session)
    if (login.error) return dbError(r, login.error)
    if (login.data.length === 0) return r.sendJson({success: false, message: "User not logged in"})
    const userid = login.data[0].userid
    let res = await db.from('userdata').select().eq('id', userid)
    if (res.error) return dbError(r, res.error)
    if (res.data.length === 0) return r.sendJson({success: false, message: "User not found"})
    const userdata = {
        email: res.data[0].email,
        ...res.data[0].data
    }
    r.sendJson({success: true, data: userdata})
}

module.exports = data