// Add like function to article
function likeArticle(ID) {
    $.post("../requests/articleLikeRequest.php", {
        like: ID
    }, function (data) {
        let dataJSON = JSON.parse(data);
        
        document.getElementById(`like${ID}`).innerHTML = dataJSON[1];

        if (dataJSON[0]) {
            document.getElementById(`like${ID}`).parentElement.children[3].firstElementChild.setAttribute("src", "https://cdn.spej.eu/fwf/icons/heart_20_filled.svg");
        } else {
            document.getElementById(`like${ID}`).parentElement.children[3].firstElementChild.setAttribute("src", "https://cdn.spej.eu/fwf/icons/heart_20_regular.svg");
        }
    });
}

// Get specified amount of articles
function printArticle(ID) {
    $.post("../requests/articleRequest.php", {
        articleID: ID
    }, function (data) {
        data = data.slice(0, -1);
        console.log(data);
        document.getElementById("articles").outerHTML = data;
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

function removeArticle(ID) {
    $.post("../requests/articleRemoveRequest.php", {
        articleID: ID
    }, function (data) {
        console.log(data);
        if (data == true) {
            console.log("Article removed");
            document.getElementById(`content${ID}`).parentElement.remove();
        }
    });
}