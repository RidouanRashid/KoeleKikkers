<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "love_tester";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}