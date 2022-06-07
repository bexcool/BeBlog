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