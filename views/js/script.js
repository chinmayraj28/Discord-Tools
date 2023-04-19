var form = document.getElementById('token-form');

form.addEventListener('submit', function(e) {
			e.preventDefault();
			      var additionalFields = document.querySelector('.additional-fields');
            let token = document.getElementById('token').value
            let status = document.getElementById('status').value
            let clientid = document.getElementById('clientid').value
            let ttitle = document.getElementById('ttitle')
            let mongo = document.getElementById('mongo')
            discordSystem.login(token, clientid, ttitle, additionalFields, form, status, mongo) 
});


function alertError(message) {
    Toastify.toast({
      text: message,
      duration: 5000,
      close: false,
      style: {
        background: 'red',
        color: 'white',
        textAlign: 'center'
      }
    })
  }
  
  function alertSuccess(message) {
    Toastify.toast({
      text: message,
      duration: 5000,
      close: false,
      style: {
        background: 'green',
        color: 'white',
        textAlign: 'center'
      }
    })
  }