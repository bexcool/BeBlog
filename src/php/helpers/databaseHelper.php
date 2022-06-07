<?php

require("../secret/databaseLogin.php");

$db = mysqli_connect($dbServer, $dbUser, $dbPass, $dbName);
mysqli_set_charset($db, "utf8");

?>