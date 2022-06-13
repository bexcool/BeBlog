<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    $article = loadArticleFromUser($db, $_POST["userID"], $_POST["articleID"]);

    $articleContainer = "user";

    echo require("../controls/articleControl.phtml");

    exit;
?>