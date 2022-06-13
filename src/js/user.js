function signIn() {
    let email, password;
    email = document.getElementById("sign-in-email").value;
    password = document.getElementById("sign-in-password").value;

    $.post("../requests/userSignInRequest.php", {
        email: email,
        password: password
    }, function (data) {
        if (data == "") {
            ShowContentDialog("error-content-dialog");
            return;
        }

        dataJSON = JSON.parse(data);

        if (dataJSON == null) {
            ShowContentDialog("error-content-dialog");
            return;
        }

        document.getElementById("my-articles").setAttribute("user", dataJSON["ID"]);

        document.getElementById("menu-item-sign-in").style = "display: none;";
        document.getElementById("menu-item-sign-up").style = "display: none;";
        document.getElementById("menu-item-account").style = "display: block;";
        document.getElementById("menu-item-create-article").style = "display: block;";
        document.getElementById("menu-item-my-articles").style = "display: block;";

        document.getElementById("menu-item-account").click();
    });
}

function signUp() {
    let username, email, password;
    username = document.getElementById("sign-up-username").value;
    email = document.getElementById("sign-up-email").value;
    password = document.getElementById("sign-up-password").value;

    document.getElementById("menu-item-account").click();

    $.post("../requests/userSignUpRequest.php", {
        username: username,
        email: email,
        password: password
    }, function (data) {
        if (data == "") {
            ShowContentDialog("error-content-dialog");
            return;
        }

        dataJSON = JSON.parse(data);

        if (dataJSON == null) {
            ShowContentDialog("error-content-dialog");
            return;
        }

        document.getElementById("my-articles").setAttribute("user", dataJSON["ID"]);

        document.getElementById("menu-item-sign-in").style = "display: none;";
        document.getElementById("menu-item-sign-up").style = "display: none;";
        document.getElementById("menu-item-account").style = "display: block;";
        document.getElementById("menu-item-create-article").style = "display: block;";
        document.getElementById("menu-item-my-articles").style = "display: block;";

        document.getElementById("menu-item-account").click();
    });
}

function signOut() {
    $.post("../requests/userSignOutRequest.php", {}, function (data) {
        document.getElementById("menu-item-sign-in").style = "display: block;";
        document.getElementById("menu-item-sign-up").style = "display: block;";
        document.getElementById("menu-item-account").style = "display: none;";
        document.getElementById("menu-item-create-article").style = "display: none;";
        document.getElementById("menu-item-my-articles").style = "display: none;";

        document.getElementById("menu-item-main").click();
    });
}

async function initUserSession() {
    $.post("../requests/userIsLoggedInRequest.php", {}, function (data) {
        if (data != "false") {
            if (data == "") {
                ShowContentDialog("error-content-dialog");
                return;
            }
    
            dataJSON = JSON.parse(data);
    
            if (dataJSON == null) {
                ShowContentDialog("error-content-dialog");
                return;
            }

            document.getElementById("menu-item-sign-in").style = "display: none;";
            document.getElementById("menu-item-sign-up").style = "display: none;";
            document.getElementById("menu-item-account").style = "display: block;";
            document.getElementById("menu-item-create-article").style = "display: block;";
            document.getElementById("menu-item-my-articles").style = "display: block;";

            document.getElementById("my-articles").setAttribute("user", dataJSON["ID"]);
        }
    });
}

function initMyAccPage(userID) {
    // get user's info
    $.post("../requests/userInfoRequest.php", {
        userID: document.getElementById("my-articles").getAttribute("user")
    }, function (data) {
        if (data == "") {
            ShowContentDialog("error-content-dialog");
            return;
        }

        dataJSON = JSON.parse(data);

        if (dataJSON == null) {
            ShowContentDialog("error-content-dialog");
            return;
        }

        document.getElementById("my-account-username").innerHTML = dataJSON["username"];
        document.getElementById("my-account-created").innerHTML = dataJSON["creationDate"];
    });
}

function getUserProfile(userID) {
    $.post("../requests/userInfoRequest.php", {
        userID: userID
    }, function (data) {
        if (data == "") {
            ShowContentDialog("error-content-dialog");
            return;
        }

        dataJSON = JSON.parse(data);

        if (dataJSON == null) {
            ShowContentDialog("error-content-dialog");
            return;
        }

        document.getElementById("user-profile-header").innerHTML = `<h2>${dataJSON["username"]}</h2>`;
        document.getElementById("user-profile-created").innerHTML = dataJSON["creationDate"];
        document.getElementById("user-profile-articles").innerHTML = "";
        getArticlesFromUser(userID, "user-profile-articles");
    });

    document.getElementById("menu-item-user-profile").click();
}