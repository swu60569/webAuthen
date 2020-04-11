function handleSignUp() {
    var email=document.getElementById('email').value;
    var password=document.getElementById('pwd').value;
    var phone=document.getElementById('phone').value;
    if(email.length<4){
        alert("Email");
        return;
    }
    if(password.length<4){
        alert("Password");
        return;
    }
    if(phone.length<10){
        alert("Phone");
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
    } else {
        alert(errorMessage);
    }
    console.log(error);
    });

}