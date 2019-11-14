$( document ).ready(function() {
  //get_server()
  var pseudo = getCookie("pseudo")
  console.log(pseudo);
  $('#pseudo').append(pseudo)

  $('#submit').on('click', function() {
    var message = $('#message').val();
    if ( message=="" ){
      return false
    }else {
      fetch('https://oruc7lifwi.execute-api.eu-central-1.amazonaws.com/Biscord_API/server/1/channel/1/messages', {
        method: 'PUT',
        credentials :'same-origin',
        body: JSON.stringify({ content: message, uuid_sender: getCookie("uuid"), uuid_channel: 'a6a2e4c3-9589-40ef-8532-21b488991ef7' })
      }).then((res) =>{
        return res.json()
      }).then(json =>{
        $("#reception_message").append(
          `<pre style='border-top: 1px solid #dac3b4;align-self :flex-end; border-bottom: 1px solid #dac3b4;
                             text-align: right; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; margin-top: 20px;'>
          <p>${getCookie('pseudo')}</p><div>${message}</div></pre>`)
      }).catch((error) =>{
        console.error('Error:', JSON.stringify(error))
      })
    }
    $('#reception_message pre').width($('#reception_message').width())
  });
});

function get_server(){
  uuid = getCookie("uuid")
  fetch(`https://oruc7lifwi.execute-api.eu-central-1.amazonaws.com/Biscord_API/user/${uuid}/servers`, {
    method: 'POST',
    credentials :'same-origin',
  }).then((res) =>{
    return res.json()
  }).then(json =>{
    list = ""
    for(server in json.server){
      list += `<li id='${server['uuid']}'>${server['name']}</li>`;
    }
    $("#servList").empty();
    $("#servList").append(list);
  }).catch((error) =>{
    console.error('Error:', error);
  })
}


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
