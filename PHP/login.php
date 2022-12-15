<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type:application/json");
$data = json_decode(file_get_contents("php://input"));

 include('server.php');
 include('functions.php');

 $mail = $data->mail;
 $pwd = $data->pwd;


 login_user($mail,$pwd);