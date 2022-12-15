<?php
$data = json_decode(file_get_contents("php://input"));
include_once('server.php');
include_once('functions.php');
include_once('core.php');




$userId = isset($_GET['userId']) ? $_GET['userId'] : '';

// Left join bookings and restaurants tables from database to get data from both

$sql = "SELECT *
FROM restaurants
INNER JOIN bookings
ON bookings.restaurantID = restaurants.id
WHERE bookings.userID = $userId
ORDER BY bookings.date ASC";

$result = $mySQL->query($sql);

if ($result) {
    while ($row =  $result->fetch_object()) {
        $bookings[] = $row;
    }
};


echo json_encode($bookings);
