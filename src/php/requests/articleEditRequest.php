<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    $article["id"] = $_POST["articleID"];
    $article["title"] = $_POST["title"];
    $article["content"] = $_POST["content"];

    editArticle($db, $article);

    exit;
?>