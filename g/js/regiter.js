$(document).ready(function () {
    $('#registerForm').submit(function (e) {
        e.preventDefault();
        const username = $('#username').val();
        const email = $('#email').val(); 

        $.ajax({
            type: 'POST',
            url: 'php/register.php',
            data: $(this).serialize(),
            success: function (response) {
                if (response === "success") {
                    
                    alert("Registration successful!");
                    window.location.href = "login.html";
                } else {
                    alert("Registration failed. Please try again.");
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                alert("An error occurred. Please try again later.");
            }
        });
    });
});
