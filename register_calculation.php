<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$post_json = file_get_contents('php://input');
$data = json_decode($post_json, true);

require_once('db.php');

$stmt = $conn->prepare("INSERT INTO results (name_1, name_2, percentage) VALUES (?, ?, ?)");
$stmt->bind_param("ssi", $data['name1'], $data['name2'], $data['percentage']);
$stmt->execute();
$rows = $stmt->affected_rows;
$stmt->close();

echo("$rows");