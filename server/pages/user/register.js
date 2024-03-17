const {db, login} = require('../../database')

function register(r) {
    // method
    if (r.method !== 'POST') return r.sendJson({success: false, message: "Invalid method"})

    // console.log(r.data)
    const verify = [
        !!r.data.email,
        !!r.data.password,
        /^(([a-zA-Z0-9\-_]\.)*[A-Za-z0-9]+)@(([a-zA-Z0-9\-]+\.)+([a-zA-Z]{2,}))$/.test(r.data.email)
    ]
    if (verify.every(v => v)) {
        // console.log(db)
        db.from('userdata').insert([{
            email: r.data.email,
            password: r.data.password,
            data: {}
        }]).select().then(res => {
            // get id
            const userid = res.data[0].id
            // auto-login
            login(userid).then(session => {
                r.sendJson({success: true, session})
            }).catch(err => {
                console.log(err)
                r.sendJson({success: false, message: "Failed to login"})
            })
        }).catch(err => {
            r.sendJson({success: false, message: "User already exists"})
        })
    } else {
        r.sendJson({success: false, message: "Invalid data"})
    }
}

module.exports = register