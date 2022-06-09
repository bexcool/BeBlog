<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    if (isset($_POST["articleID"])) {
        removeArticle($db, $_POST["articleID"]);
    }

    echo true;

    exit;
?>