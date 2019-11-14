$( document ).ready(function() {
  $('#submit').on('click', function() {
    var user = $('#pseudo').val();
    var password = $('#password').val();
    if ( user=="" || password=="" ){
      return false
    }else {
      fetch('https://oruc7lifwi.execute-api.eu-central-1.amazonaws.com/Biscord_API/login', {
        method: 'POST',
        credentials :'same-origin',
        body: JSON.stringify({ pseudo: user, password: password })
      }).then((res) =>{
        return res.json()}
      ).then(json =>{
        if (json.statusCode == 200){
          document.cookie = `uuid=${json.user_id}`;
          document.cookie = `pseudo=${user}`;
          window.location = "accueil.html";
        }
      }).catch((error) =>{
        console.error('Error:', JSON.stringify(error))}
      )
    }
  });
});
