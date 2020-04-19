const state_enum = {
    NO_USER_LOGON: 'no_user_logon',
    SIGN_UP: 'sign_up',
    USER_LOGON: 'user_logon',
}

var state = state_enum.USER_LOGON;

var current_user = null;

function initApp() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            current_user = user;
            state = state_enum.USER_LOGON;
        } else {
            state = state_enum.NO_USER_LOGON;
        }
        render();
    });
}

function signIn() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email.length < 4) {
        alert("Plese enter an email address.");
        return;
    }
    if (password.length < 4) {
        alert("Plese enter a password.");
        return;
    }

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
                alert("Wrong password.");
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

function signUp() {
    // var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    // var phone = document.getElementById("phone").value;

    if (email.length < 4) {
        alert("Email");
        return;
    }
    if (password.length < 4) {
        alert("Password");
        return;
    }

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/weak-password") {
                alert("The password is too weak.");
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });
}

function logOut() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    }
}

function submit() {
    if (state == state_enum.SIGN_UP) {
        signUp()
    }
    if (state == state_enum.NO_USER_LOGON) {
        signIn();
    }
    if (state == state_enum.USER_LOGON) {
        logOut();
    }
}

function render() {
    console.log(state);
    if (state == state_enum.SIGN_UP) {
        showSignUp();
    }
    if (state == state_enum.NO_USER_LOGON) {
        showLogin();
    }
    if (state == state_enum.USER_LOGON) {
        showUserDetail();
    }
}

function showSignUp() {
    document.getElementById("container-header").textContent = "CREATE YOUR ACCOUNT";
    var login_form_element = document.getElementsByClassName("wrap-input100");
    for (i = 0; i < login_form_element.length; i++) {
        login_form_element.item(i).style.display = "flex";
    }
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("submit").textContent = "Create account";
    var user_detail_element = document.getElementsByClassName("user-detail").item(0);
    user_detail_element.style.display = "none";
    document.getElementById("create-account").textContent = "";
    document.getElementById("forgot-password").textContent = "";
}

function showLogin() {
    document.getElementById("container-header").textContent = "ACCOUNT LOGIN";
    var login_form_element = document.getElementsByClassName("wrap-input100");
    for (i = 0; i < login_form_element.length; i++) {
        login_form_element.item(i).style.display = "flex";
    }
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("submit").textContent = "Sign In";
    var user_detail_element = document.getElementsByClassName("user-detail").item(0);
    user_detail_element.style.display = "none";
    document.getElementById("create-account").textContent = "New here? create an account";
    document.getElementById("forgot-password").textContent = "Forgot password?";
}

function showUserDetail() {
    console.log(current_user);
    document.getElementById("container-header").textContent = "User Detail";
    var login_form_element = document.getElementsByClassName("wrap-input100");
    for (i = 0; i < login_form_element.length; i++) {
        login_form_element.item(i).style.display = "none";
    }
    var fireBase_name = current_user.displayName;
    var fireBase_email = current_user.email;
    var fireBase_emailVerified = current_user.emailVerified;
    var fireBase_isAnonymous = current_user.isAnonymous;
    var fireBase_uid = current_user.uid;
    var user_detail_element = document.getElementsByClassName("user-detail").item(0);

    user_detail_element.style.display = "block";
    user_detail_element.innerHTML =
        "User Logged in with Credentials: <br />" +
        "<b>Name:</b> " +
        fireBase_name +
        "<br />" +
        "<b>Email: </b>" +
        fireBase_email +
        "<br />" +
        "<b>emailVerified: </b>" +
        fireBase_emailVerified +
        "<br />" +
        "<b>isAnonymous: </b>" +
        fireBase_isAnonymous +
        "<br />" +
        "<b>uid: </b>" +
        fireBase_uid

    document.getElementById("submit").textContent = "Logout";
    document.getElementById("create-account").textContent = "";
    document.getElementById("forgot-password").textContent = "";
}