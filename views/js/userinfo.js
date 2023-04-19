const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    var additionalFields = document.querySelector('.additional-fields');
    let clientId = document.getElementById('clientid').value
    let token = document.getElementById('token').value
    let ttitle = document.getElementById('ttitle')
    let i1 = document.getElementById('i1')
    let i2 = document.getElementById('i2')
    let i3 = document.getElementById('i3')
    let i4 = document.getElementById('i4')
    userInfoSystem.getUserInfo(clientId, token, ttitle, additionalFields, form, i1, i2, i3, i4)

})