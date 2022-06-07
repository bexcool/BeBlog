<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    $user = findAccountByID($db, $_GET["user"]);

    $title = "BeBlog - {$user["username"]}";

    require("../templates/header.phtml");
    require("./userProfile.phtml");
    require("../templates/footer.phtml");
?>