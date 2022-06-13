<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    $articles = loadArticlesFromUser($db, $_POST["userID"]);

    echo json_encode($articles);

    exit;
?>