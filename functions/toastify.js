const Toastify = require('toastify-js');

function alertError(message){
    Toastify({
        text: message,
        duration: 5000,
        close: false,
        style: {
          background: 'red',
          color: 'white',
          textAlign: 'center'
        }
      }).showToast();
}

function alertSuccess(message){
    Toastify({
        text: message,
        duration: 5000,
        close: false,
        style: {
          background: 'green',
          color: 'white',
          textAlign: 'center'
        }
      }).showToast();
}

module.exports = { alertError, alertSuccess }