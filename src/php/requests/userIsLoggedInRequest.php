<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");
    
    if (isset($_SESSION["user"])) echo json_encode($_SESSION["user"]);
    else echo "false";
    
    exit;
?>