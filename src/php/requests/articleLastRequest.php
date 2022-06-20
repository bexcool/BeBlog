<?php
    // Začne session
    session_start();

    // Přidá funkce
    require("../helpers/databaseHelper.php");
    require("../helpers/accountHelper.php");
    require("../helpers/articleHelper.php");

    // Získá všechny články pomocí funkce z articleHelper.php
    $articles = loadLastArticles($db, $_POST["amount"], $_POST["offset"]);

    // Vytvoří JSON a vrátí ho
    echo json_encode($articles);

    exit;
?>