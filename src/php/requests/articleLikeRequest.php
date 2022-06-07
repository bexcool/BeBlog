<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    $output;

    if (isset($_POST["like"])) {
        if (getArticleUserLikes($db, $_POST["like"], $_SESSION["user"]["ID"]) > 0) {
            unlikeArticle($db, $_POST["like"], $_SESSION["user"]["ID"]);
            $output[0] = 0;  
        }
        else {
            likeArticle($db, $_POST["like"], $_SESSION["user"]["ID"]);
            $output[0] = 1;  
        }
    }

    $output[1] = count(getArticleLikes($db, $_POST["like"]));

    echo json_encode($output);
    exit;
?>