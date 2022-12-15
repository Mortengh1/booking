<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    include('server.php');
    include('functions.php');
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $mail = $_POST['mail'];
    $age = $_POST['age'];
    $phonenr = $_POST['phonenr'];
    $resite = $_POST['resite'];
    $pwd = $_POST['pwd'];
   

    // $sqlMails = "SELECT mail FROM users";
    // $user_mails = $mySQL->query($sqlMails)->fetch_assoc();
    $hashed_password = password_hash($pwd, PASSWORD_DEFAULT);


    $sql = "SELECT * FROM users";
    $result = mysqli_query($mySQL, $sql);
    $user_mails = array();
    $user_phonenr = array();
    $mailUsed = '';
    $phonenrUsed = '';
    while($row = mysqli_fetch_array($result)) {
        $user_mails[] = $row['mail'];
        $user_phonenr[] = $row['phonenr'];
    }
    $error_message = [];
    $error = false;
    if($firstname == '' ){
        $error = true;
     
    }
    if($lastname == '' ){
        $error = true;
       
    }
    if($mail == '' ){
        $error = true;
       
    }
    if($mail && in_array($mail, $user_mails)){
        $error = true;
        $error_message[] = "E-mailen er allerede brugt";
       
    }
    
    if($age == '' ){
        $error = true;
       
    }
    if($phonenr == '' ){
        $error = true;
       
    }
    if($phonenr && in_array($phonenr, $user_phonenr)){
        $error = true;
        $error_message[] = "Telefon nummeret er allerede brugt";
       
    }
    if($pwd == '' ){
        $error = true;
   
    }

    if($pwd != '' && $resite == '' ){
        $error = true;
       
    }

    if($pwd == $resite){
        
    }else {
        $error = true;
   
    }

    

    if($error == true){
        foreach($error_message as $error){
            echo '<div className="ErrorMessage"><p>'.$error.'</p></div>';
        }
        die();
        
    }

    


    $insert_login = "INSERT INTO users (firstname, lastname, mail, age, phonenr, pwd) VALUES ('$firstname', '$lastname', '$mail','$age', '$phonenr', '$hashed_password')";
    $inserted_login = $mySQL->query($insert_login);
