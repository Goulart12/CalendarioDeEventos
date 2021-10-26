function validate() {
    let name = registrationForm.name.value;
    let lastName = registrationForm.lastName.value;
    let email = registrationForm.email.value;
    let password = registrationForm.password.value;
    let confirmPassword = registrationForm.passwordConfirm.value;

    if(name == ""){
        alert("Preencha o campo Nome.")
        registrationForm.name.focus();
        return false;
    }

    if(lastName == ""){
        alert("Preencha o campo Sobrenome.")
        registrationForm.lastName.focus();
        return false;
    }

    if(email == "" || email.indexOf('@') == -1){
        alert("Preencha o campo Email.")
        registrationForm.email.focus();
        return false;
    }

    if(password == "" || password.length < 6){
        alert("Sua senha não preenche os requisitos de pelo menos 6 caracteres.")
        registrationForm.password.focus();
        return false;
    }

    if(confirmPassword == "" || confirmPassword.length < 6){
        alert("Sua senha não preenche os requisitos de pelo menos 6 caracteres.")
        registrationForm.confirmPassword.focus();
        return false;
    }

    if(password != confirmPassword) {
        alert("Sua senha está diferente!")
        registrationForm.confirmPassword.focus();
        return false;
    }
}
