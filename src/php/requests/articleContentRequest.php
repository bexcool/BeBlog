<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    $article = loadArticle($db, $_POST["articleID"]);
    
    echo $article["content"];
    
    exit;
?>