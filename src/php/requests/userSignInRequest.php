<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");
    
    logInAccount($db, $_POST["email"], $_POST["password"]);

    if (isset($_SESSION["user"])) {
        echo json_encode($_SESSION["user"]);
    } else {
        echo "";
    }
    
    exit;
?>