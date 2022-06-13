<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    $articles = loadAllArticles($db);
    
    if ($articles != null) {
        echo count($articles);
    }

    exit;
?>