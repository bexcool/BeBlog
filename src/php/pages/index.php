<?php
    session_start();

    $title = "BeBlog - Main";

    require("../templates/header.phtml");
    require("./index.phtml");
    require("../templates/footer.phtml");
?>