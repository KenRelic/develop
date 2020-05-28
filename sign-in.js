// import { localStorage } from "./create-account.js";
let localStorage = window.localStorage;
let validationMessage = document.getElementById('validation-error');


function validateDetails() {
    let password = document.getElementById('password');
    let email = document.getElementById('email');
    let validationMessage = document.getElementById('validation-error');

    if (localStorage.hasOwnProperty(email.value)) {
        let userDetails = JSON.parse(localStorage[email.value])
        if (userDetails.password === password.value) {
           validationMessage.innerHTML ='login in..'
        } else {
            //password incorrect
            validationMessage.innerHTML = '**Incorrect Password';
            validationMessage.style.visibility = 'visible';
        }
    } else {
        //This email doesnt exist.
        if (email.value == ""){
            validationMessage.innerHTML = "**The Email field is required";
            validationMessage.style.visibility = 'visible';
        } else {
            validationMessage.innerHTML = "**This Email isn\'t registered yet";
            validationMessage.style.visibility = 'visible';
        }

    }
}

let signInBtn = document.getElementById('sign-in-btn');
signInBtn.addEventListener('click', validateDetails);

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


// TRIGGER INPUT CHECK
let inputBoxes = document.querySelectorAll('.form-input input');
inputBoxes.forEach(box => {
    box.addEventListener('focus', () => {
        box.nextElementSibling.style.top = '0.5em';
        box.nextElementSibling.style.left = '2.5em';
    });
    box.addEventListener('blur', () => {        
        if (box.value !== "") {
            box.nextElementSibling.style.top = '0.5em';
            box.nextElementSibling.style.left = '2.5em';
            box.nextElementSibling.style.fontWeight = 'normal';
            
        //    if(localStorage.hasOwnProperty(inputBoxes[0].value)){
        //     validationMessage.innerHTML = '**Email already exists';
        //     validationMessage.style.visibility = 'visible';
        //    }
            
        } else {
            box.nextElementSibling.style.top = '1.5em';
            box.nextElementSibling.style.left = '2.5em';
            box.nextElementSibling.style.fontWeight = '700';
        }
    });

});



