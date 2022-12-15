<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));

include('server.php');
include('functions.php');

$resName = $data->resName;
$resAddress = $data->resAddress;
$mail = $data->mail;
$capacity = $data->capacity;
$phonenr = $data->phonenr;
$imageFile = $data->image;
$city = $data->city;
$postnr = $data->postnr;
$descr = $data->descr;


create_restaurant($resName, $resAddress, $mail, $capacity, $phonenr, $imageFile, $city, $postnr, $descr);
