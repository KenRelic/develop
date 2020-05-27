//FORM VALIATION//
let localStorage = window.localStorage;
let validationError = document.getElementById('validation-error');

function validateForm() {
    let forms = document.forms;
    let createAccountForm = forms['create-account-form'];
    let passwordInput = createAccountForm['password'];
    let nameInput = createAccountForm['full-name'];
    let emailInput = createAccountForm['email'];
    let organisation = document.querySelector('.account-type');

    if (passwordInput.value == "" && nameInput.value == "" && emailInput.value == "") {
        passwordInput.parentElement.classList.add('failed');
        nameInput.parentElement.classList.add('failed');
        emailInput.parentElement.classList.add('failed');
        organisation.parentElement.classList.add('failed');
        return false;
    }
    console.log(emailInput.value, nameInput.value, passwordInput.value, selectedOption)
    return createUser(emailInput.value, nameInput.value, passwordInput.value, selectedOption)
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
    }
}


options.forEach(option => {
    option.addEventListener('click', () => {
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
        }
    })
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
        } else {
            box.nextElementSibling.style.top = '2em';
            box.nextElementSibling.style.left = '2.6em';
        }
    });
    box.addEventListener('input', ()=>{
        if(box.validity.patternMismatch || box.validity.typeMismatch){
            box.parentElement.nextElementSibling.style.visibility = 'visible';
            return false
        }else{
            box.parentElement.nextElementSibling.style.visibility = 'hidden';
        }
    })
})
//creat new user
function createUser(fullName, email, password, accountType) {
    if (!localStorage.hasOwnProperty(email)) {
        localStorage.setItem(email, { 'fullName': fullName, 'password': password, 'accountType': accountType })
        // Display confrimation page
        document.getElementById('notification').style.display = "flex";
    } else {
        // show error that the username is already taken
        //or check on INPUT.. 

    }
}


export {localStorage} ;


