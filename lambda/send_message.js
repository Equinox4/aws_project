const { Pool } = require('pg')
const pool = new Pool()

exports.handler = async (event) => {

    if (!event.uuid_channel || !event.uuid_sender || !event.content) {
        return "{\"error\":\"empty required parameter\"}"
    }

    const client = await pool.connect()

    let id_user = await client.query({
        text: "SELECT id_user FROM biscord_user WHERE uuid_user = $1",
        values: [ event.uuid_sender ]
    }).then(res => {
        if (res.rowCount == 0) {
            return null
        }
        return res.rows[0].id_user
    })

    if (!id_user) {
        return {"error":"User not found"}
    }

    let id_channel = await client.query({
        text: "SELECT id_channel FROM channel WHERE uuid_channel = $1",
        values: [ event.uuid_channel ]
    }).then(res => {
        if (res.rowCount == 0) {
            return null
        }
        return res.rows[0].id_channel
    })

    if (!id_channel) {
        return {"error":"Channel not found"}
    }

    let res = await client.query({
        text: "INSERT INTO message (id_channel, id_user, content) VALUES ($1, $2, $3)",
        values: [ id_channel, id_user, event.content ]
    }).then(res => {
        return res
    })
    .catch(err => {
        console.log(err.stack)
    })

    await client.end()
    return res
}

