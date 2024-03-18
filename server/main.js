const cli = require('node-server-cli');

cli.api.setup(90, {
})

function dbError(r, error, msg) {
    r.sendJson({success: false, message: msg || "Database Error", error})
    console.error(error)
}

module.exports = {
    dbError
}