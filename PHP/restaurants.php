<?php
$data = json_decode(file_get_contents("php://input"));
include_once('server.php');
include_once('functions.php');
include_once('core.php');

$userId = $data->userId;
$city = isset($_GET['city']) ? $_GET['city'] : '';


if ($city) {
    $sql = "SELECT * FROM restaurants WHERE city LIKE '%$city%'";
} else {
    $sql = "SELECT * FROM restaurants";
}

$result = $mySQL->query($sql);

if ($result) {
    while ($row =  $result->fetch_object()) {
        $restaurants[] = $row;
    }
}


echo json_encode($restaurants);
