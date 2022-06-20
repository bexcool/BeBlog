<?php 

function createAccount($db, $username, $email, $password) {
    $queryMatch = "SELECT * FROM users WHERE username = '$username' OR email = '$email'";

    $result = mysqli_query($db, $queryMatch);

    if ($result) return "exists";

    $query = 
    "   INSERT INTO users (username, email, password)
        VALUES ('{$username}', '{$email}', '" . sha1($password) . "')
    ";

    $result = mysqli_query($db, $query);

    if ($result) {
        return logInAccount($db, $email, $password);
    }
    else {
        echo "Error: " . mysqli_error($db);
    }
}

function logInAccount($db, $email, $password) {
    $query = 
    "   SELECT *
        FROM users
        WHERE email = '{$email}' 
          AND password = '" . sha1($password) . "'
    ";

    $result = mysqli_query($db, $query);
    $user = mysqli_fetch_assoc($result);

    if ($user) {
        $_SESSION["user"] = $user;
        return $user;
    }
    else
    {
        $chyba = "Přihlášení nebylo úspěšné";
        return $chyba;
    }
}

function logOutAccount() {
    unset($_SESSION["user"]);
    exit;
}

function findAccountByID($db, $ID) {
    $query = 
    "   SELECT *
        FROM users
        WHERE ID = '{$ID}'
    ";

    $result = mysqli_query($db, $query);
    $user = mysqli_fetch_assoc($result);

    return $user;
}

?>