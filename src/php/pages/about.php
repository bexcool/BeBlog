<?php
    session_start();

    $title = "BeBlog - About";

    require("../templates/header.phtml");
    require("./about.phtml");
    require("../templates/footer.phtml");
?>