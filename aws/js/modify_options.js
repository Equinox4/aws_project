$( document ).ready(function() {
  $('#modifs_options_compte').on('click', function() {
	var uuid_user= getCookie("uuid");
	var nom = $('#modif_nom').val();
	var prenom = $('#modif_prenom').val();
	var pseudo = $('#modif_pseudo').val();

    if (nom == "" || prenom == "" || pseudo == ""){
      return false
    }else {
      fetch('https://oruc7lifwi.execute-api.eu-central-1.amazonaws.com/Biscord_API/user/${uuid_user}', {
        method: 'PATCH',
        credentials :'same-origin',
        body: JSON.stringify({ pseudo: pseudo, lastname: nom, firstname : prenom, uuid_user : uuid_user })
      }).then((res) =>{
        return res.json()}
      ).then(json =>{
        if (json.statusCode == 200){
          document.cookie = `uuid=${json.user_id}`;
          document.cookie = `pseudo=${pseudo}`;
          window.location = "options.html";
        }else{
          alert("marche pas")
        }
      }).catch((error) =>{
        console.error('Error:', JSON.stringify(error))}
      )
    }
  });
});


function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
