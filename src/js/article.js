// Add like function to article
function likeArticle(ID) {
    $.post("../requests/articleLikeRequest.php", {
        like: ID
    }, function (data) {
        let dataJSON = JSON.parse(data);

        if (dataJSON == null)  {
            ShowContentDialog("error-content-dialog");
            return;
        }
        
        document.getElementById(`like${ID}`).innerHTML = dataJSON[1];

        if (dataJSON[0]) {
            document.getElementById(`like${ID}`).parentElement.children[3].firstElementChild.setAttribute("src", "https://cdn.spej.eu/fwf/icons/heart_20_filled.svg");
        } else {
            document.getElementById(`like${ID}`).parentElement.children[3].firstElementChild.setAttribute("src", "https://cdn.spej.eu/fwf/icons/heart_20_regular.svg");
        }
    });
}

// Print article
function printArticle(ID, where) {
    $.post("../requests/articleRequest.php", {
        articleID: ID
    }, function (data) {
        if (data == "")  {
            ShowContentDialog("error-content-dialog");
            return;
        }

        data = data.slice(0, -1);

        // create element and insert data
        let article = document.createElement("div");
        article.innerHTML = data;

        document.getElementById(where).append(article);
        
        getContentArticle(ID);
    });
}

// Print article from user
function printUserArticle(userID, articleID, where) {
    $.post("../requests/articleUserRequest.php", {
        userID: userID,
        articleID: articleID
    }, function (data) {
        if (data == "")  {
            ShowContentDialog("error-content-dialog");
            return;
        }

        data = data.slice(0, -1);

        // create element and insert data
        let article = document.createElement("div");
        article.innerHTML = data;

        document.getElementById(where).append(article);
        
        getContentArticle(articleID, "user");
    });
}

function prepareContentForArticle(ID, content) {
    // Add article's content
    document.getElementById(`content${ID}`).innerHTML = marked.parse(content);
    // Make compatible with Fluent
    contentHTML = document.getElementById(`content${ID}`).innerHTML;
    contentHTML = contentHTML.replace(/<a href="(.*?)">(.*?)<\/a>/g, '<fluent-hyperlink href="$1" target="_blank">$2</fluent-hyperlink>');
    
    document.getElementById(`content${ID}`).innerHTML = contentHTML;
}

function removeArticle(articleID) {
    $.post("../requests/articleRemoveRequest.php", {
        articleID: articleID
    }, function (data) {
        if (data == true) {
            document.getElementById(`content${articleID}`).parentElement.remove();
            if (document.getElementById(`content-user${articleID}`) != null) {
                document.getElementById(`content-user${articleID}`).parentElement.remove();
            }
        }
    });
}

// Gets last articles
function getLastArticles(amount, offset) {
    $.post("../requests/articleLastRequest.php", {
        amount: amount,
        offset: offset
    }, function (data) {
        if (data == "") {
            ShowContentDialog("error-content-dialog");
            return;
        }
        
        let dataJSON = JSON.parse(data);

        if (dataJSON == null) {
            ShowContentDialog("error-content-dialog");
            return;
        }

        dataJSON.forEach(element => {
            printArticle(element["ID"], "articles");
        });
    });
}

// Gets last articles
function getArticlesFromUser(id, where = "my-articles") {
    $.post("../requests/articlesFromUserRequest.php", {
        userID: id
    }, function (data) {
        if (data == "") {
            ShowContentDialog("error-content-dialog");
            return;
        }
        
        let dataJSON = JSON.parse(data);

        if (dataJSON == null) {
            ShowContentDialog("error-content-dialog");
            return;
        }

        dataJSON.forEach(element => {
            printUserArticle(id, element["ID"], where);
        });
    });
}

// Gets last articles
function getRandomArticles(amount, where = "main-feed-articles") {
    $.post("../requests/articleRandomRequest.php", {
        amount: amount
    }, function (data) {
        if (data == "") {
            ShowContentDialog("error-content-dialog");
            return;
        }
        
        let dataJSON = JSON.parse(data);

        if (dataJSON == null) {
            ShowContentDialog("error-content-dialog");
            return;
        }

        document.getElementById(where).innerHTML = "";

        dataJSON.forEach(element => {
            printArticle(element["ID"], where);
        });
    });
}

function getAmountOfArticles() {
    $.post("../requests/articleAmountRequest.php", {}, function (data) {
        return data;
    });
}

function getContentArticle(ID, where = "") {
    $.post("../requests/articleContentRequest.php", {
        articleID: ID
    }, function (data) {
        // Add article's content
        document.getElementById(`content${where}${ID}`).innerHTML = marked.parse(`${data}`);
        // Make compatible with Fluent
        contentHTML = document.getElementById(`content${where}${ID}`).innerHTML;
        contentHTML = contentHTML.replace(/<a href="(.*?)">(.*?)<\/a>/g, '<fluent-hyperlink href="$1" target="_blank">$2</fluent-hyperlink>');
        
        document.getElementById(`content${where}${ID}`).innerHTML = contentHTML;
    });
}

function publishArticle() {
    let title, content;
    title = document.getElementById("publish-title").value;
    content = document.getElementById("publish-content").value;

    $.post("../requests/articlePublishRequest.php", {
        title: title,
        content: content
    }, function (data) {

    });
}

function editArticle(id) {
    title = document.getElementById(`edit-title${id}`).value;
    content = document.getElementById(`edit-content${id}`).value;

    $.post("../requests/articleEditRequest.php", {
        articleID: id,
        title: title,
        content: content
    }, function () {
        refreshArticles();
    });
}

// Refresh articles list
function refreshArticles() {
    document.getElementById("articles").innerHTML = "";
    getLastArticles(10, 0);
    setTimeout(() => document.getElementById("articles-loading").style.display = "none", 1000);
}

// Refresh articles list
function refreshMyArticles() {
    document.getElementById("my-articles").innerHTML = "";
    getArticlesFromUser(document.getElementById("my-articles").getAttribute("user"));
    setTimeout(() => document.getElementById("my-articles-loading").style.display = "none", 1000);
}