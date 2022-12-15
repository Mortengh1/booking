<?php
$data = json_decode(file_get_contents("php://input"));
include_once('server.php');
include_once('functions.php');
include_once('core.php');

$userId = $data->userId;

$sql = "SELECT * FROM users WHERE id = '$userId'";
    $result = $mySQL->query($sql);
    $user = $result->fetch_assoc();
       


echo json_encode($user);