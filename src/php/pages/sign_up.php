<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");

    if (isset($_POST["username"])) {
        createAccount($db, $_POST["username"], $_POST["email"], $_POST["password"]);
    }

    $title = "BeBlog - Sign up";

    require("../templates/header.phtml");
    require("./sign_up.phtml");
    require("../templates/footer.phtml");
?>