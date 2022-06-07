<?php
session_start();

require("../helpers/accountHelper.php");

unset($_SESSION["user"]);

header("Location: ../pages/index.php");
exit;
?>