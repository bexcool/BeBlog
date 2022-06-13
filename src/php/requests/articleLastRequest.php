<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    $articles = loadLastArticles($db, $_POST["amount"], $_POST["offset"]);

    echo json_encode($articles);

    exit;
?>