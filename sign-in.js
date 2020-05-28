// import { localStorage } from "./create-account.js";
let localStorage = window.localStorage;
let validationMessage = document.getElementById('validation-error');
let loader = document.getElementById('loader-bg');


function validateDetails() {
    let password = document.getElementById('password');
    let email = document.getElementById('email');
    let validationMessage = document.getElementById('validation-error');

    if (localStorage.hasOwnProperty(email.value)) {
        let userDetails = JSON.parse(localStorage[email.value])
        if (userDetails.password === password.value) {
            validationMessage.innerHTML = 'login in...'
            validationMessage.style.visibility = 'visible';
            return setTimeout(() => { displayLoader() }, 1000);
        } else {
            //password incorrect
            validationMessage.innerHTML = '**Incorrect Password';
            return validationMessage.style.visibility = 'visible';
        };
    } else {
        //This email doesnt exist.
        if (email.value == "") {
            validationMessage.innerHTML = "**The Email field is required";
            return validationMessage.style.visibility = 'visible';
        } else {
            if (!email.checkValidity()) {
                validationMessage.innerHTML = "**Please enter a valid email";
            } else {
                validationMessage.innerHTML = "**This Email isn\'t registered yet";
            }
            return validationMessage.style.visibility = 'visible';
        };
    };
};

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
        moveLabel(box, '0.5em', '2.5em', 'normal');
    });
    box.addEventListener('blur', () => {
        if (box.value !== "") {
            moveLabel(box, '0.5em', '2.5em', 'normal');
        } else {
            moveLabel(box, '1.5em', '2.5em', '700');
        }
    });

});

function displayLoader() {

    loader.style.display = "flex";
    setTimeout(() => {
        inputBoxes.forEach(box => {
            box.value = '';
            moveLabel(box, '1.5em', '2.5em', '700');
        });
        validationMessage.style.visibility = 'hidden';
        loader.style.display = "none";
    }, 5000);
}

function moveLabel(el, top, left, fontWeight) {
    el.nextElementSibling.style.top = top;
    el.nextElementSibling.style.left = left;
    el.nextElementSibling.style.fontWeight = fontWeight;
};

//RETRIEVE PASSWORD
let sendRetrievalRequestBtn = document.getElementById('retrieve-password-btn');
let openPasswordRetrievalPageBtn = document.querySelector('.retrieve-password-link');
let gotoSignInPageBtn = document.getElementById('to-signin-btn');
let retrievalPage = document.getElementById('retrieve-password-page');
let requestConfirmationPage = document.getElementById('retrieval-request-confirmation');

openPasswordRetrievalPageBtn.addEventListener('click', displayPasswordRetrievalPage);
sendRetrievalRequestBtn.addEventListener('click', sendPasswordRetrievalRequest);
gotoSignInPageBtn.addEventListener('click', loadSignInPage)
function displayPasswordRetrievalPage() {
    loader.style.display = "flex";
    setTimeout(() => {
        retrievalPage.style.display = "flex";
        loader.style.display = "none";
    }, 2000);
}

sendRetrievalRequestBtn.addEventListener('click', sendPasswordRetrievalRequest);
function sendPasswordRetrievalRequest() {
    requestConfirmationPage.style.left = '0';
}

function loadSignInPage() {
    loader.style.display = "flex";
    retrievalPage.style.display = "none"
    setTimeout(() => {
        requestConfirmationPage.style.left = '101%';
        loader.style.display = "none";
    },2000)
}
