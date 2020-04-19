window.onload = function () {
  initApp();
};

function initApp() {
  //ตรวจสอบและรับข้อมูลผู้ใช้
  firebase.auth().onAuthStateChanged((user) => {
    document.getElementById("quickstart-verify-email").disabled = true;
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      document.getElementById("quickstart-signin-status").textContent =
        "Signed in";
      document.getElementById("quickstart-signin").textContent = "Sign out";
      document.getElementById(
        "quickstart-account-details"
      ).textContent = JSON.stringify(user, null);
      if (!emailVerified) {
        document.getElementById("quickstart-verify-email".disabled) = false;
      }
    } else {
      // No user is signed in.
      document.getElementById("quickstart-signin-status").textContent =
        "Signed out";
      document.getElementById("quickstart-signin").textContent = "Sign in";
      document.getElementById("quickstart-account-details").textContent =
        "null";
    }
    document.getElementById("quickstart-signin").disabled = false;
  });
}

function handleSignUp() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  // var phone=document.getElementById('phone').value;
  if (email.length < 4) {
    alert("Email");
    return;
  }
  if (password.length < 4) {
    alert("Password");
    return;
  }
  // if(phone.length<10){
  //     alert("Phone");
  //     return;
  // }
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

function toggleSignIn() {
  //ลงทะเบียน
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    //รอบ2
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
    firebase.auth().onAuthStateChanged((user) => {
      document.getElementById("quickstart-verify-email").disabled = false;
      if (user) {
        // User is signed in.
        var user = firebase.auth().currentUser;
        if (user != null) {
          var fireBase_name = user.displayName;
          var fireBase_email = user.email;
          var fireBase_emailVerified = user.emailVerified;
          var fireBase_photo = user.photoURL;
          var fireBase_isAnonymous = user.isAnonymous;
          var fireBase_uid = user.uid;
          var fireBase_providerData = user.providerData;
          var success = document.getElementById("quickstart-account-details");

          document.getElementById("quickstart-signin-status").textContent =
            "Signed in";
          document.getElementById("quickstart-signin").textContent = "Sign out";
          success.style.display =
            success.style.display === "none" || success.style.display === ""
              ? "block"
              : "none";
          success.innerHTML =
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
            "<b>photo: </b>" +
            fireBase_photo +
            "<br />" +
            "<b>isAnonymous: </b>" +
            fireBase_isAnonymous +
            "<br />" +
            "<b>uid: </b>" +
            fireBase_uid +
            "<br />" +
            "<b>Providerdata: </b>" +
            fireBase_providerData +
            "<br />";
        }
        if (!emailVerified) {
          document.getElementById("quickstart-verify-email".disabled) = false;
        }
      } else {
        // No user is signed in.
        document.getElementById("quickstart-signin-status").textContent =
          "Signed out";
        document.getElementById("quickstart-signin").textContent = "Sign in";
        document.getElementById("quickstart-account-details").textContent =
          "null";
      }
      document.getElementById("quickstart-signin").disabled = false;
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById("quickstart-signin").disabled = false;
      });
  }
  document.getElementById("quickstart-signin").disabled = true;
}

function sendMail() {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      alert("Email Verification Sent.");
    });
}

function resetPass() {
  //ต้องมีการกรอก email
  var email = document.getElementById("email").value;
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Password Reset Sent.");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/invalid-email") {
        alert(errorMessage);
      } else if (errorCode == "auth/user-not-found") {
        alert(errorMessage);
      }
      console.log(error);
    });
}
