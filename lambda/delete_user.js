exports.handler = async (event) => {
    
    // get user data from event
    var id= event['id_user'];
    
    // querry creation
    var query_line = ` DELETE FROM biscord_user WHERE biscord_user.id_user=${id}`;
    
    
    // client connection                             
    const { Client } = require('pg');  //  Needs the nodePostgres Lambda Layer.
    const client = new Client();
    await client.connect();
    
    return client.query(query_line)
};
