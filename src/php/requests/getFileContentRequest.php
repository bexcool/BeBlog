<?php
    session_start();

    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    if ($_FILES['file']['error'] > 0) {
        echo 'Error: ' . $_FILES['file']['error'];
    }
    else {
        $file = file($_FILES['file']['tmp_name']);
        echo json_encode([htmlspecialchars(implode($file)), pathinfo($_FILES['file']['name'])["filename"]]);
    }

    exit;
?>