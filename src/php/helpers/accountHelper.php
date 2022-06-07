<?php 

function createAccount($db, $username, $email, $password) {
    $query = 
    "   INSERT INTO users (username, email, password)
        VALUES ('{$username}', '{$email}', '" . sha1($password) . "')
    ";

    $result = mysqli_query($db, $query);

    if ($result) {
        logInAccount($db, $email, $password);
    
        header("Location: ../pages/index.php");
        exit;
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
        header("Location: ../pages/index.php");
        exit;
    }
    else
    {
        $chyba = "Přihlášení nebylo úspěšné";
        return $chyba;
    }
}

function logOutAccount() {
    unset($_SESSION["user"]);
    header("Location: ../pages/index.php");
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