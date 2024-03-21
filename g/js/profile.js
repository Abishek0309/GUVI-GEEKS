$(document).ready(function () {
    // Fetch email from local storage
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('keyname');

    if (name && email) {
       
        $('#username').text(name);
    } else {
        window.location.href = "login.html";
    }

    // update data on click method
    function sendData() {
        var email = localStorage.getItem('email');
        // Serialize form data
        var formData = $('#update-profile-form').serializeArray();
        var jsonData = {};
        $.each(formData, function (index, field) {
            jsonData[field.name] = field.value;
        });
        jsonData['email'] = email;
        var jsonString = JSON.stringify(jsonData);
        $.ajax({
            type: 'POST',
            url: 'php/profile.php',
            data: jsonString,
            success: function (response) {
                // Handle success response here
                console.log('Data sent successfully');
                alert("Hoorey! Profile Updated");
                console.log(response); 
                window.location.href = "profile.html";
            },
            error: function (xhr, status, error) {
                // Handle error
                console.error('Error sending data:', error);
            }
        });
    }

function displayProfileData(data){
    $('#dfullname').text('Full Name: ' + data.fullname);
    $('#ddob').text('Date of Birth:' + data.dob);
    $('#dage').text('Age: ' + data.age);
    $('#dgender').text('Gender: ' + data.gender);
    $('#dcontact').text('Contact: ' + data.contact);
    $('#dstate').text('State: ' + data.state);
    $('#deducation').text('Education: ' + data.education);
    $('#doccupation').text('Occupation: ' + data.occupation);

}
    $('#update-profile-form').submit(function (event) {
        event.preventDefault(); 
        sendData(); 
    });
checkEmailInMongoDB();
    function checkEmailInMongoDB() {
        const email = localStorage.getItem('email');
        if (email) {
            $.ajax({
                url: 'php/profile.php', 
                type: 'GET',
                contentType: 'application/x-www-form-urlencoded',
                data: {email:email },

                success: function (response) {
                   
                    var responseData = JSON.parse(response);
                    // console.log(responseData.data.age);
                    // Handle response
                    console.log(responseData);
                    if (responseData.exists) {
                        var data = responseData.data;
                        console.log(data);
                        displayProfileData(data);
                        var d1 = document.getElementById("con");
                        d1.style.display = "none";
                        var d2 = document.getElementById("userProfile");
                        d2.style.display = "block";
                        // Add other fields as needed
                    } else {
                        console.log('Email does not exist in MongoDB.');
                        // Handle accordingly
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', status, error);
                }
            });
        } else {
            alert("Kindly update user profile");
        }
    }
    $('#ViewProfile').click(function (event) {
        // event.preventDefault(); // Prevent default form submission
        checkEmailInMongoDB(); // Call the sendData function
    });
    function logout() {
        localStorage.removeItem('email'); // Clear email from local storage
        localStorage.removeItem('keyname'); // Clear name from local storage (if needed)
        window.location.href = "login.html"; // Redirect to login page
    }

    // Bind click event to logout button
    $('#logout-btn').click(function () {
        logout(); // Call the logout function
    });

    
});
