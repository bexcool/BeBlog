<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    $articles = loadRandomArticles($db, 10);

    echo json_encode($articles);

    exit;
?>