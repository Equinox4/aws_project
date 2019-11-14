const { Pool } = require('pg')
const pool = new Pool()

exports.handler = async (event) => {

    // verifier que la suppression provient bien du sender

    if (!event.uuid_message) {
        return "{\"error\":\"empty required parameter\"}"
    }

    const client = await pool.connect()

    let res = await client.query({
        text: "DELETE FROM message WHERE uuid_message = $1;",
        values: [ event.uuid_message ]
    }).then(res => {
        return res
    })
    .catch(err => {
        console.log(err.stack)
    })

    await client.end()
    return res
}

