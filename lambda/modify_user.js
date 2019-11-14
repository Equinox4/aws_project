
exports.handler = async (event) => {
    // get user data from event 
    var id= event['id_user'];
    var lastname = event['lastname'];
    var firstname = event['firstname'];
    var pseudo = event['pseudo'];
    var email = event['email'];
    var password = event['password'];
    var color = event['couleur'];
    
    // querry creation
    var query_line = `UPDATE biscord_user
                       SET lastname=${lastname}, firstname=${firstname},pseudo=${pseudo},email=${email},password=${password},color=${color}
                       WHERE user_id=${id}`; //à changer
    
    // client connection                             
    const { Client } = require('pg');  //  Needs the nodePostgres Lambda Layer.
    const client = new Client();
    await client.connect();
    
    return client.query(query_line)
};
