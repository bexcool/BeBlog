<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");
    
    logOutAccount();
    
    exit;
?>