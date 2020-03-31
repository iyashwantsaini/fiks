const button = document.getElementById('signinbutton');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
    let admin = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };
    if (checkEmptyString(admin.email))
    {
        alert('email is required');
        return;
    }
    if (checkEmptyString(admin.password))
    {
        alert('Password is required');
        return;
    }

    $.ajax({
        type: "POST",
        url: "/login",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href='/cart';
            } else {
                alert("Invalid User !");
            }
        },
        data: admin
    });
});

function checkEmptyString(val)
{
    return (val == undefined || val == null || val.trim().length == 0);
}
