<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");
    
    $userAcc = findAccountByID($db, $_POST["userID"]);

    $userAcc["creationDate"] = date("H:i d.m.Y ", strtotime($userAcc["creationDate"]));

    echo json_encode($userAcc);
    
    exit;
?>