$(document).ready(function () {
    $('#loginForm').submit(function (e) {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        const name =$('#name').val();
        $.ajax({
            type: 'POST',
            url: 'php/login.php',
            data: {
                email: email,
                password: password
            },
            success: function (response) {
                if (response === "success") {
                    localStorage.setItem('email', email);
                    localStorage.setItem('keyname', name);
                    alert("Login successful!");
                    window.location.href = "profile.html"; // Redirect to profile page
                } else {
                    alert("Incorrect credentials. Please try again.");
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                alert("An error occurred. Please try again later.");
            }
        });
    });
});