<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/articleHelper.php");
    require("../helpers/accountHelper.php");

    if (isset($_GET["like"])) {
        if (getArticleUserLikes($db, $_GET["like"], $_SESSION["user"]["ID"]) > 0) {
            unlikeArticle($db, $_GET["like"], $_SESSION["user"]["ID"]);
        }
        else {
            likeArticle($db, $_GET["like"], $_SESSION["user"]["ID"]);
        }
        
        header("Location: ./myArticles.php");
        exit;
    }

    $title = "BeBlog - My articles";

    require("../templates/header.phtml");
    require("./myArticles.phtml");
    require("../templates/footer.phtml");
?>