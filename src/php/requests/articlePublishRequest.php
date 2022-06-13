<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    $article["title"] = $_POST["title"];
    $article["content"] = $_POST["content"];

    createArticle($db, $article);

    exit;
?>