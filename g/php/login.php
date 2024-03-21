<?php
$hostname = "localhost";
$username = "root";
$password = "";
$dbname = "details";

$conn = new mysqli($hostname, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if data is sent via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare and bind SQL statement
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);

    // Execute the statement
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && $user['password'] == $password) {
        echo "success";
    } else {
        // Login failed
        echo "error";
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
    error_log("Error message", 3, "error.log");

}
?>