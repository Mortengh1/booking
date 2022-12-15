<?php

// login users 
function login_user($mail, $pwd)
{
    global $mySQL;

    $password_verify = false;

    $mail = isset($mail) ? $mail : false;
    $password = isset($pwd) ? $pwd : false;
    //Checks if mail og password is present and checks if a user with the chosen mail is in the database
    if ($mail && $password) {
        $sql = "SELECT * FROM users WHERE mail = '$mail'";
        $result = $mySQL->query($sql);

        $user = $result->fetch_assoc();
        if ($user) {
            $user_id = $user['id'];
            $mail = $user['mail'];
            $hashed_password = $user['pwd'];
            //verifyes the  hashed password
            $password_verify = password_verify($password, $hashed_password);
        }
    }
    //If the password is verifyed and the databasen contains the user it send the response back as JSON with user_id and mail
    if ($password_verify) {
        if ($result) {
            $response['status'] = 'valid';
            $response['userId'] = $user_id;
            $response['userMail'] = $mail;

            echo json_encode($response);
            //if nu user in database with the chosen mail, it sends the response back as JSON with the error
        } else {
            $response['status'] = 'invalid';
            $response['errorMessage'] = 'Fejl';
            echo json_encode($response);
        }
    } else {
        //If password could not be verifyed, it sends the response back as JSON with the error
        $response['status'] = 'invalid';
        $response['errorMessage'] = 'Forkert kodeord';
        echo json_encode($response);
    }
}

//Creates a restaurant in the database
function create_restaurant($resName, $resAddress, $mail, $capacity, $phonenr, $imageFile, $city, $postnr, $descr)
{
    global $mySQL;
    //Checks is every needed value is present. If the value is empty it sets error to true and tells what the error is
    $error = false;
    if ($resName == '') {
        $error = true;
        $response['errorMessage'] = "Ingen navn";
    }
    if ($resAddress == '') {
        $error = true;
        $response['errorMessage'] = "Ingen adresse";
    }
    if ($mail == '') {
        $error = true;
        $response['errorMessage'] = "Ingen email";
    }
    if ($capacity == '') {
        $error = true;
        $response['errorMessage'] = "Ingen kapacitet";
    }
    if ($phonenr == '') {
        $error = true;
        $response['errorMessage'] = "Ingen tlf. nr.";
    }
    if ($city == '') {
        $error = true;
        $response['errorMessage'] = "Ingen by";
    }
    if ($postnr == '') {
        $error = true;
        $response['errorMessage'] = "Ingen post nr.";
    }
    if ($descr == '') {
        $error = true;
        $response['errorMessage'] = "Ingen beskrivelse";
    }



    /* Takes the image base64 code and gets the nedded information before given the image file and giving it a new uniq ID 
and saving the file at the chosen place at §DIRToSave */
    if ($imageFile) {
        $DIR = __DIR__ . "/images/";
        $DIRToSave = "https://skole.mortengh.dk/PHP/images/";
        $file_chunks = explode(";base64,", $imageFile);
        $fileType = explode("image/", $file_chunks[0]);
        $image_type = $fileType[1];
        $base64Img = base64_decode($file_chunks[1]);
        $uniqID = uniqid();
        $fileSave = $DIRToSave . $uniqID . '.png';
        $file = $DIR . $uniqID . '.png';
        file_put_contents($file, $base64Img);
    }

    //If there is an error it sends the response back as JSON
    if ($error == true) {
        echo json_encode($response);
        die();
    }

    //If there is no errors it inserts the values into MySQL using SQL
    $insert_login = "INSERT INTO restaurants (resName, resAddress, mail, capacity, phonenr, img, postnr, city, descr) VALUES ('$resName', '$resAddress', '$mail','$capacity', '$phonenr', '$fileSave', '$postnr', '$city', '$descr')";
    $inserted_login = $mySQL->query($insert_login);
}

function create_booking($howMany, $date, $time, $restaurantID, $usersID)
{
    global $mySQL;

    $error_message = [];
    $error = false;
    if ($howMany == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: antal personer";
    }
    if ($date == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: Dato";
    }
    if ($time == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: Tid";
    }
    if ($restaurantID == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: RestaurantID";
    }

    if ($usersID == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: UserID";
    }

    if ($error == false) {
        $response['status'] = 'valid';
        echo json_encode($response);
    } else {
        $response['status'] = 'invalid';
        echo json_encode($response);
        die();
    }

    $insert_booking = "INSERT INTO bookings (numbOfPeople, date, time, restaurantID, userID) VALUES ('$howMany', '$date', '$time','$restaurantID', '$usersID')";
    $inserted_booking = $mySQL->query($insert_booking);
}

//Deletes a booking from the database
function delete_booking($userID, $bookingID)
{
    global $mySQL;
    //Checks if the needed vaules is present, if they are not it sets error to true and tells the error
    if ($userID == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: Ingen bruger id";
    }
    if ($bookingID == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: Ingen booking id";
    }

    //If there is no error it send a valid repsonse back and if there is an error it sends an invalid response back
    if ($error == false) {
        $response['status'] = 'valid';

        echo json_encode($response);
    } else {
        $response['status'] = 'invalid';

        echo json_encode($response);
        die();
    }

    //If no errors it deletes the row from the database
    $delete_booking = "DELETE FROM bookings WHERE id = $bookingID and userID = $userID LIMIT 1";
    $deleteed_booking = $mySQL->query($delete_booking);
}

//Updates a user
function update_user($firstname, $lastname, $age, $phonenr, $userId)
{
    global $mySQL;
    //Checks if the needed values is present. If they are not it sets error to true and tells what the error is
    $error = false;
    if ($firstname == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: Fornavn";
    }
    if ($lastname == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: Efternavn";
    }
    if ($age == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: Alder";
    }
    if ($phonenr == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: til. nr.";
    }
    if ($userId == '') {
        $error = true;
        $response['errorMessage'] = "Fejl: userId";
    }

    // If there is no errors it sends a valid reponse back and if there is errors it sends an invalid response back 
    if ($error == false) {
        $response['status'] = 'valid';
        echo json_encode($response);
    } else {
        $response['status'] = 'invalid';
        echo json_encode($response);
        die();
    }

    //if there is no errors, it updates the user with the values in MySQL using SQL
    $insert_updated_user = "UPDATE users SET firstname = '$firstname', lastname = '$lastname', age = '$age', phonenr = '$phonenr' WHERE id = $userId";
    $inserted_updated_user = $mySQL->query($insert_updated_user);
}
