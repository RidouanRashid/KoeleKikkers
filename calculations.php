<?php
require_once('db.php');

$stmt = $conn->prepare("SELECT * FROM results ORDER BY created_at DESC");
$stmt->execute();
$result = $stmt->get_result();
//$data = $result->fetch_assoc();
$stmt->close();

$results = array();
while ($row = $result->fetch_assoc()) {
    $results[] = $row;
}

echo(json_encode($results));