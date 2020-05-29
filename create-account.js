//prevent scrolling
function noScroll() {
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
}
function allowScroll() {
    document.body.style.height = 'unset';
    document.body.style.overflow = 'unset';
}

//FORM VALIATION//
let localStorage = window.localStorage;
let validationError = document.getElementById('validation-error');

let dropIcon = document.getElementById('drop-down-icon');
let selectedOption = document.getElementById('select-input');
let accountListLabel = document.getElementById('account-type-label');
let targetSelectElem = document.querySelector('.select-account-type');

function validateForm() {
    // let forms = document.forms;
    // let createAccountForm = forms['create-account-form'];
    let passwordInput = document.getElementById('password')
    let nameInput = document.getElementById('full-name');
    let emailInput = document.getElementById('email');
    let organisation = selectedOption.innerText;

    if (passwordInput.checkValidity() && nameInput.checkValidity() && emailInput.checkValidity() && organisation !== undefined) {
        if (localStorage.hasOwnProperty(emailInput.value)) {
            emailInput.parentElement.nextElementSibling.innerHTML = "**This email is already registered";
            emailInput.parentElement.nextElementSibling.style.visibility = 'visible';
            return false;
        } else {
            createUser(emailInput.value, nameInput.value, passwordInput.value, selectedOption)
            console.log(localStorage[emailInput.value]);
            setTimeout(() => {
                // Display confrimation page
                document.getElementById('notification').style.display = "flex";
                return window.preventUserScroll() || noScroll();
            }, 300);
        }
    } else {
        emailInput.checkValidity() ? '' : emailInput.parentElement.nextElementSibling.style.visibility = 'visible';
        passwordInput.checkValidity() ? '' : passwordInput.parentElement.nextElementSibling.style.visibility = 'visible';
        nameInput.checkValidity() ? '' : nameInput.parentElement.nextElementSibling.style.visibility = 'visible';
        organisation !== "" ? '' : selectedOption.parentElement.nextElementSibling.style.visibility = 'visible';
        return false;
    }
}

let createAccountBtn = document.getElementById('create-account-btn');
createAccountBtn.addEventListener('click', validateForm);
let togglePasswordIcon = document.getElementById('show-hide-password');
togglePasswordIcon.addEventListener('click', showHidePassword);
function showHidePassword() {
    let passwordElem = document.getElementById('password');
    if (passwordElem.type == 'password') {
        passwordElem.type = 'text';
        return togglePasswordIcon.classList.value = "fas fa-eye-slash";
    } else {
        passwordElem.type = 'password';
        return togglePasswordIcon.classList.value = "fas fa-eye";
    };
};



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
            return dropIcon.setAttribute('class', 'fas fa-sort-down');
        }
    } else {
        document.getElementById('select-account').style.display = "none";
        return dropIcon.setAttribute('class', 'fas fa-sort-down');
    };
};


options.forEach(option => {
    option.addEventListener('click', () => {
        moveAccountListLabel(accountListLabel, "0", "0.8em", "2.7em", targetSelectElem, "1em 1em 1em 2.2em", selectedOption, "hidden");
        // selectedOption.parentElement.nextElementSibling.style.visibility = 'hidden';
        // accountListLabel.style.top = "0em";
        // accountListLabel.style.fontSize = "0.8em";
        // accountListLabel.style.left = "2.6em";
        // targetSelectElem.style.padding = "1em 1em 1em 2.2em";
        selectedOption.innerHTML = option.innerText;
        selectedOption.style.display = 'block';
        optionList.style.display = "none";
        dropIcon.setAttribute('class', 'fas fa-sort-down');
        if (selectedOption.innerText == "") {
            moveAccountListLabel(accountListLabel, "1.5em", "1em", "2.6em", targetSelectElem, "1em 1em 2.6em 2.3em", selectedOption, "visible");
            // accountListLabel.style.top = "1.5em";
            // accountListLabel.style.fontSize = "1em";
            // accountListLabel.style.left = "2.6em";
            // targetSelectElem.style.padding = "1em 1em 2.6em 2.3em";
            // selectedOption.parentElement.nextElementSibling.style.visibility = 'visible';
        };
    });
});

function moveAccountListLabel(label, labelTop, labelFontSize, labelLeft, labelParentElem, parentElPadding, selectedOption, visibility) {
    label.style.top = labelTop;
    label.style.fontSize = labelFontSize;
    label.style.left = labelLeft;
    labelParentElem.style.padding = parentElPadding;
    selectedOption.parentElement.nextElementSibling.style.visibility = visibility;
}
//CHECK IF THERE IS CONTENT IN THE INPUT THEN PREVENT ANIMATION
let inputBoxes = document.querySelectorAll('.form-input input');
inputBoxes.forEach(box => {
    box.addEventListener('focus', () => {
        box.nextElementSibling.style.top = '-0.1em';
        box.nextElementSibling.style.left = '2.7em';
    });
    box.addEventListener('blur', () => {
        if (box.value !== "") {
            box.nextElementSibling.style.top = '-0.1em';
            box.nextElementSibling.style.left = '2.7em';
            if (box.id == "email") {
                if (box.checkValidity()) {
                    if (localStorage.hasOwnProperty(box.value)) {
                        box.parentElement.nextElementSibling.innerHTML = "**This email is already registered";
                        box.parentElement.nextElementSibling.style.visibility = 'visible';
                    } else {
                        box.parentElement.nextElementSibling.style.visibility = 'hidden';
                    };
                } else {
                    box.parentElement.nextElementSibling.innerHTML = "**Please fill a valid Email";
                    box.parentElement.nextElementSibling.style.visibility = 'visible';
                };
            };
        } else {
            box.nextElementSibling.style.top = '1.5em';
            box.nextElementSibling.style.left = '2.6em';
            box.parentElement.nextElementSibling.innerHTML = "**Please fill a valid Email";
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

