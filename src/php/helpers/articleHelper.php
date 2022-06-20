<?php 
function loadLastArticles($db, $amount, $offset = 0) {
    // Připraví dotaz pro získání určitého počtu posledních článků
    // Možné je použít offset pro získání dalších článků bez načítání celého obsahu.
    $query = 
    "   SELECT *
        FROM articles
        ORDER BY id DESC LIMIT $amount
        OFFSET $offset;
    ";

    // Odešle dotaz
    $result = mysqli_query($db, $query);

    // Pokud byl dotaz úspšný, tak vytvoří pole článků
    if ($result) {
        $articles = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    
    // Vrací pole článků
    return $articles;
}

function loadArticle($db, $ID) {
    $query = 
    "   SELECT *
        FROM articles
        WHERE id = $ID
    ";

    $result = mysqli_query($db, $query);

    if ($result) {
        $article = mysqli_fetch_array($result, MYSQLI_ASSOC);
    
        return $article;
    }
    else {
        return null;
    }
}

function loadArticlesFromUser($db, $userID) {
    $query = 
    "   SELECT *
        FROM articles
        WHERE userID = $userID
        ORDER BY id DESC
    ";

    $result = mysqli_query($db, $query);

    if ($result) {
        $articles = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    
    return $articles;
}

function loadArticleFromUser($db, $userID, $ID) {
    $query = 
    "   SELECT *
        FROM articles
        WHERE userID = $userID AND id = $ID
    ";

    $result = mysqli_query($db, $query);

    if ($result) {
        $article = mysqli_fetch_array($result, MYSQLI_ASSOC);
    }
    
    return $article;
}

function loadAllArticles($db) {
    $query = 
    "   SELECT *
        FROM articles
        ORDER BY id DESC
    ";

    $result = mysqli_query($db, $query);

    if ($result) {
        $articles = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    
    return $articles;
}

function loadRandomArticles($db, $amount) {
    $query = 
    "   SELECT *
        FROM articles
        ORDER BY RAND()
        LIMIT $amount
    ";

    $result = mysqli_query($db, $query);

    if ($result) {
        $articles = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    
    return $articles;
}

function editArticle($db, $article) {
    $query = 
    "   UPDATE articles
        SET title = '{$article["title"]}',
            content = '{$article["content"]}'
        WHERE id = '{$article["id"]}'
    ";

    $result = mysqli_query($db, $query);

    return $result;
}

function createArticle($db, $article) {
    $query = 
    "   INSERT INTO articles
        (userID, title, content)
        VALUES
        ('{$_SESSION["user"]["ID"]}', '{$article["title"]}', '{$article["content"]}')
    ";

    mysqli_query($db, $query);
}

function removeArticle($db, $ID) {
    $query = 
    "   DELETE FROM articles
        WHERE id = $ID
    ";

    mysqli_query($db, $query);
}

function likeArticle($db, $articleID, $userID) {
    $query = 
    "   INSERT INTO likes
        (articleID, userID)
        VALUES
        ('{$articleID}', '{$userID}')
    ";

    mysqli_query($db, $query);
}

function unlikeArticle($db, $articleID, $userID) {
    $query = 
    "   DELETE FROM likes
        WHERE articleID = '{$articleID}' AND userID = '{$userID}'
    ";

    mysqli_query($db, $query);
}

function getArticleLikes($db, $articleID) {
    $query = 
    "   SELECT *
        FROM likes
        WHERE articleID = '{$articleID}'
    ";

    $result = mysqli_query($db, $query);

    if ($result) {
        $likes = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    
    return $likes;
}

function getArticleUserLikes($db, $articleID, $userID) {
    $query = 
    "   SELECT *
        FROM likes
        WHERE articleID = '{$articleID}' AND userID = '{$userID}'
    ";

    $result = mysqli_query($db, $query);

    if ($result) {
        return count(mysqli_fetch_all($result, MYSQLI_ASSOC));
    }
}
?>