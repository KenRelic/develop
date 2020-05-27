//FORM VALIATION//
let localStorage = window.localStorage;
let validationError = document.getElementById('validation-error');

function validateForm() {
    let forms = document.forms;
    let createAccountForm = forms['create-account-form'];
    let passwordInput = createAccountForm['password'];
    let nameInput = createAccountForm['full-name'];
    let emailInput = createAccountForm['email'];
    let organisation = selectedOption.innerText;

    if (passwordInput.checkValidity() && nameInput.checkValidity() && emailInput.checkValidity() && organisation !== "") {

        createUser(emailInput.value, nameInput.value, passwordInput.value, selectedOption)
        // window.open('create-account.html');
        // setTimeout(() => {
        // window.open('index.html', '_self');
        setTimeout(() => {
            // Display confrimation page
            document.getElementById('notification').style.display = "flex";
        }, 300);
        // },1000);
        return true;
    } else {
        emailInput.checkValidity() ? '' : emailInput.parentElement.nextElementSibling.style.visibility = 'visible';
        passwordInput.checkValidity() ? '' : passwordInput.parentElement.nextElementSibling.style.visibility = 'visible';
        nameInput.checkValidity() ? '' : nameInput.parentElement.nextElementSibling.style.visibility = 'visible';
        organisation !== "" ? '' : selectedOption.parentElement.nextElementSibling.style.visibility = 'visible';
        return false;
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


let dropIcon = document.getElementById('drop-down-icon');
let selectedOption = document.getElementById('select-input');
let accountListLabel = document.getElementById('account-type-label');
let targetSelectElem = document.querySelector('.select-account-type');
dropIcon.addEventListener('click', toggleSelectDrop);
targetSelectElem.addEventListener('click', toggleSelectDrop);
selectedOption.addEventListener('click', toggleSelectDrop);
function toggleSelectDrop() {
    let optionList = document.getElementById('select-account');
    dropIcon.setAttribute('class', 'fas fa-sort-up');
    switch (optionList.style.display) {
        case 'block': optionList.style.display = 'none';
            dropIcon.setAttribute('class', 'fas fa-sort-down');
            break;
        default: optionList.style.display = 'block';
            dropIcon.setAttribute('class', 'fas fa-sort-up');
            break;
    }
}

let optionList = document.getElementById('select-account');
let options = Array.from(optionList.children);
window.onclick = function (event) {
    let x = event.target;
    if (x.parentElement.className === "form-group select-account-type") {
        dropIcon.setAttribute('class', 'fas fa-sort-up');
        document.getElementById('select-account').style.display = "block";
        if (x.id === "list-item1" || x.id === "list-item2") {
            selectedOption.innerHTML = x.innerText;
            document.getElementById('select-account').style.display = "none";
            dropIcon.setAttribute('class', 'fas fa-sort-down');
        }
    } else {
        document.getElementById('select-account').style.display = "none";
        dropIcon.setAttribute('class', 'fas fa-sort-down');
    };
};


options.forEach(option => {
    option.addEventListener('click', () => {
        selectedOption.parentElement.nextElementSibling.style.visibility = 'hidden';
        accountListLabel.style.top = "0.5em";
        accountListLabel.style.fontSize = "0.8em";
        accountListLabel.style.left = "2.9em";
        targetSelectElem.style.padding = "2em 0 1.5em 2.6em";
        selectedOption.innerHTML = option.innerText;
        selectedOption.style.display = 'block';
        optionList.style.display = "none";
        dropIcon.setAttribute('class', 'fas fa-sort-down');
        if (selectedOption.innerText == "") {
            accountListLabel.style.top = "1.5em";
            accountListLabel.style.fontSize = "1em";
            accountListLabel.style.left = "2.6em";
            targetSelectElem.style.padding = "2.4em 0 2.1em 2.6em";
            selectedOption.parentElement.nextElementSibling.style.visibility = 'visible';
        };
    });
});

//CHECK IF THERE IS CONTENT IN THE INPUT THEN PREVENT ANIMATION
let inputBoxes = document.querySelectorAll('.form-input input');
inputBoxes.forEach(box => {
    box.addEventListener('focus', () => {
        box.nextElementSibling.style.top = '0.4em';
        box.nextElementSibling.style.left = '2.7em';
    });
    box.addEventListener('blur', () => {
        if (box.value !== "") {
            box.nextElementSibling.style.top = '0.4em';
            box.nextElementSibling.style.left = '2.7em';
            // box.parentElement.nextElementSibling.style.visibility = 'hidden';
        } else {
            box.nextElementSibling.style.top = '2em';
            box.nextElementSibling.style.left = '2.6em';
            box.id == "email" ? localStorage.hasOwnProperty(box.value) ?
                box.parentElement.nextElementSibling.innerHTML = "**This email is already registered" :
                box.parentElement.nextElementSibling.innerHTML = "**Please fill a valid Email" : ""
            box.parentElement.nextElementSibling.style.visibility = 'visible';
        }
    });
    box.addEventListener('input', () => {
        if (box.validity.patternMismatch || box.validity.typeMismatch) {
            box.parentElement.nextElementSibling.style.visibility = 'visible';
            box.id == "email" ? localStorage.hasOwnProperty(box.value) ? box.parentElement.nextElementSibling.innerHTML = "**This email is already registered" :
                box.parentElement.nextElementSibling.innerHTML = "**Please fill a valid Email" : ""
            box.parentElement.nextElementSibling.style.visibility = 'visible';
        } else {
            box.parentElement.nextElementSibling.style.visibility = 'hidden';
        }
    })
})
//creat new user
function createUser(email, fullName, password, accountType) {
    if (!localStorage.hasOwnProperty(email)) {
        let newUser = {
            name: fullName,
            password: password,
            accountType: accountType,
            email: email
        }
        //save to localstorage
        localStorage.setItem(email, JSON.stringify(newUser));
    }
}


// window.onscroll = function(event){
//     if(this.scrollY == 90){
//         this.document.getElementById('menu').style.cbackgroundColor = 'red'
//     }else{
//         this.document.getElementById('menu').style.cbackgroundColor = 'initial'
//     }
// }

