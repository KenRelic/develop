//FORM VALIDATION//
let localStorage = window.localStorage;
let validationError = document.getElementById('validation-error');

function validateForm() {
    let forms = document.forms;
    let createAccountForm = forms['sign-in-form'];
    let passwordInput = createAccountForm['password'];
    let emailInput = createAccountForm['email'];

    if (passwordInput.value == "" && nameInput.value == "" && emailInput.value == "" && organisation.selectedIndex == 0) {
        passwordInput.parentElement.classList.add('failed');
        nameInput.parentElement.classList.add('failed');
        emailInput.parentElement.classList.add('failed');
        organisation.parentElement.classList.add('failed');
    }

}
let togglePasswordIcon = document.getElementById('show-hide-password');
togglePasswordIcon.addEventListener('click', showHidePassword);
function showHidePassword() {
    let passwordElem = document.getElementById('password');
    if (passwordElem.type == 'password') {
        passwordElem.type = 'text';
        togglePasswordIcon.classList.value = "fas fa-eye-slash";
    } else {
        passwordElem.type = 'password';
        togglePasswordIcon.classList.value = "fas fa-eye";
    }
}

