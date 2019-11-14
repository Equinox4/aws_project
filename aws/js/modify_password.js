$( document ).ready(function() {
  $('#modifs_options_mdp').on('click', function() {

	var uuid_user= getCookie("uuid");

	var oldPassWord = $('#old_password').value;
	var newPassWord = $('#new_password').value;
	var newPassWordConfirm = $('#new_password_confirm').value;

    if (oldPassWord == "" || newPassWord == "" || newPassWordConfirm == ""){
      return false;
	}else if(newPassWord != newPassWordConfirm){
		return false;
    }else {
      fetch('https://oruc7lifwi.execute-api.eu-central-1.amazonaws.com/Biscord_API/user/${uuid_user}/password', {
        method: 'PATCH',
        credentials :'same-origin',
        body: JSON.stringify({ oldpassword : oldPassWord, newpassword : newPassWord, uuid_user : uuid_user })
      }).then((res) =>{
        return res.json()}
      ).then(json =>{
        if (json.statusCode != 200){
          alert("marche pas")
        }else {
          window.location = "accueil.html";
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
