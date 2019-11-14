const { Pool } = require('pg')
const pool = new Pool()

exports.handler = async (event) => {

    // verifier que la modif provient bien du sender

    if (!event.uuid_message || !event.content) {
        return "{\"error\":\"empty required parameter\"}"
    }

    const client = await pool.connect()

    let res = await client.query({
        text: "UPDATE message SET content = $1 WHERE uuid_message = $2;",
        values: [ event.content, event.uuid_message ]
    }).then(res => {
        return res
    })
    .catch(err => {
        console.log(err.stack)
    })

    await client.end()
    return res
}

