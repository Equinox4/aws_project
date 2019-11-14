
exports.handler = async (event) => {
    // get user data from event 
    var name = event['prenom']
    var last_name = event['nom']
    var pseudo = event['pseudo']
    var email = event['email']
    var password = event['password']
    var color = event['couleur']
    
    // querry creation
    var querry_line = `INSERT INTO user(name, last_name, pseudo, email, password, color) VALUES
                                  (${name}, ${last_name}, ${pseudo}, ${email}, ${password}, ${color})`
    
    // client connection                             
    const { Client } = require('pg');  //  Needs the nodePostgres Lambda Layer.
    const client = new Client();
    await client.connect();
    
    return client.querry(querry_line)
};
