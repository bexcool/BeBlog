<?php 
function loadLastArticles($db, $amount) {
    $query = 
    "   SELECT *
        FROM articles
        ORDER BY id DESC LIMIT $amount
    ";

    $result = mysqli_query($db, $query);

    if ($result) {
        $articles = mysqli_fetch_all($result, MYSQLI_ASSOC);
    }
    
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
        $article = mysqli_fetch_all($result, MYSQLI_ASSOC)[0];
    }
    
    return $article;
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