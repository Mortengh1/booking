<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));

include('server.php');
include('functions.php');

$firstname = $data->firstName;
$lastname = $data->lastName;
$age = $data->age;
$phonenr = $data->phoneNr;
$userId = $data->userId;


update_user($firstname, $lastname, $age, $phonenr, $userId);
