exports.handler = async (event) => {
    
    // get user data from event
    var id = event['pseudo']; 
    var password = event['password'];
    
    // querry creation
    var query_line = `SELECT FROM biscord_user 
                      WHERE pseudo=${id} AND password=${password}`;
    
    
    // client connection                             
    const { Client } = require('pg');  //  Needs the nodePostgres Lambda Layer.
    const client = new Client();
    await client.connect();
    
    if (client.query(query_line)){    // à tester je sais pas si ca marche(si on 
        console.log(`connexion réussit de ${id}` );
        return true;
    }
    else{
        console.log("erreur de id/password");
        return false;}
};
