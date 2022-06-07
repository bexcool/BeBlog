<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/articleHelper.php");

    if (isset($_POST["title"])) {
        createArticle($db, $_POST);
    }

    $title = "BeBlog - Create article";

    require("../templates/header.phtml");
    require("./createArticle.phtml");
    require("../templates/footer.phtml");
?>