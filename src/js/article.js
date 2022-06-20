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
function printArticle(ID, where, whereID = "") {
    // Získá PHTML element článku
    $.post("../requests/articleRequest.php", {
        articleID: ID,
        whereID: whereID
    }, function (data) {
        if (data == "")  {
            ShowContentDialog("error-content-dialog");
            return;
        }

        // Z nějakého důvodu je na konci '.', takže ji odstraňuji
        data = data.slice(0, -1);

        // Vytvoří element a vloží data ve formě "articleControl.php"
        let article = document.createElement("div");
        article.innerHTML = data;

        // Vloží element do seznamu článků
        document.getElementById(where).append(article);
        
        // Získá obsah článku, parsuje markdown a vloží jej do článku
        getContentArticle(ID, whereID);
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
            if (document.getElementById(`content-main${articleID}`) != null) {
                document.getElementById(`content-main${articleID}`).parentElement.remove();
            }
        }
    });
}

// Gets last articles
function getLastArticles(amount, offset) {
    // Poslání požadavku pro získání článků
    $.post("../requests/articleLastRequest.php", {
        amount: amount,
        offset: offset
    }, function (data) {
        // Pokud jsou data prázná, tak zobrazí chybu a vrátí se
        if (data == "") {
            ShowContentDialog("error-content-dialog");
            return;
        }
        
        let dataJSON = JSON.parse(data);

        // Pokud je JSON prázdný, tak zobrazí chybu a vrátí se
        if (dataJSON == null) {
            ShowContentDialog("error-content-dialog");
            return;
        }

        // Vypíše všechny získané články do stránky
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
            printArticle(element["ID"], where, "main");
        });
    });
}

function getAmountOfArticles() {
    $.post("../requests/articleAmountRequest.php", {}, function (data) {
        return data;
    });
}

function getContentArticle(ID, where = "") {
    // Získá obsah článku
    $.post("../requests/articleContentRequest.php", {
        articleID: ID
    }, function (data) {
        // Parsuje markdown
        let contentHTML = marked.parse(`${data}`);
        // Zaručení kompatibility s Fluent frameworkem (Změní <a> odkazy na <fluent-hyperlink>)
        contentHTML = contentHTML.replace(/<a href="(.*?)">(.*?)<\/a>/g, '<fluent-hyperlink href="$1" target="_blank">$2</fluent-hyperlink>');
        // Vloží HTML do článku
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

// Load content from file
function loadContentFromFile() {
    let fileData = $(`#publish-file-content`).prop('files')[0];
    let formData = new FormData();

    formData.append('file', fileData);

    $.ajax({
        url: '../requests/getFileContentRequest.php',
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        type: 'post',
        success: (data) => {
            let dataJSON = JSON.parse(data);
            document.getElementById("publish-content").value = dataJSON[0];
            document.getElementById("publish-title").value = dataJSON[1];
        }
    });
}

// Refresh articles list
function refreshArticles() {
    // Vyčístí seznam článků
    document.getElementById("articles").innerHTML = "";
    // Získá posledních 10 článků
    getLastArticles(10, 0);
    // Zobrazí načítací animaci, která je jenom pro efekt
    setTimeout(() => document.getElementById("articles-loading").style.display = "none", 1000); 
}

// Refresh articles list
function refreshMyArticles() {
    document.getElementById("my-articles").innerHTML = "";
    getArticlesFromUser(document.getElementById("my-articles").getAttribute("user"));
    setTimeout(() => document.getElementById("my-articles-loading").style.display = "none", 1000);
}