<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");

    if (isset($_POST["email"])) {
        logInAccount($db, $_POST["email"], $_POST["password"]);
    }

    $title = "BeBlog - Sign in";

    require("../templates/header.phtml");
    require("./sign_in.phtml");
    require("../templates/footer.phtml");
?>