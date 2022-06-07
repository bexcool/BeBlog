<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/articleHelper.php");
    require("../helpers/accountHelper.php");

    $title = "BeBlog - Articles";

    require("../templates/header.phtml");
    require("./articles.phtml");
    require("../templates/footer.phtml");
?>