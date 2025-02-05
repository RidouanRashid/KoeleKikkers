<?php
require_once('db.php');

$stmt = $conn->prepare("DELETE FROM results");
$stmt->execute();
$stmt->close();


echo "History has been reset";