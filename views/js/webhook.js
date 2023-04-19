const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const webhookUrl = document.getElementById('webhook-url').value;
    const title = document.getElementById('title').value;
    const color = document.getElementById('color').value;
    const desc = document.getElementById('content').value;
    const image = document.getElementById("file").value;

    try{
        //url, title, color, desc
        if (image) {
            await webhookSystem.sendWebhook(webhookUrl, title, color, desc, image);
            alertSuccess(`Content Has Been Sent To The Webhook!`)
        }else{
            await webhookSystem.sendWebhook(webhookUrl, title, color, desc);
            alertSuccess(`Content Has Been Sent To The Webhook!`)
        }
    }catch(err){
        console.log(err)
        alertError(`There was an error connecting to the webhook!\nError: ${err}`)
    }
    

    
    form.reset();
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