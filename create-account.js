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

let dropIcon = document.getElementById('drop-down-icon');
let selectedOption = document.getElementById('select-input');
dropIcon.addEventListener('click', toggleSelectDrop);
selectedOption.addEventListener('click', toggleSelectDrop);

function toggleSelectDrop() {
    let optionList = document.getElementById('select-account');
    
   if(optionList.style.display == 'none'){
        optionList.style.display = 'block';
        dropIcon.setAttribute('class', 'fas fa-sort-up');
   } else{
       optionList.style.display = 'none';
       dropIcon.setAttribute('class', 'fas fa-sort-down');
   }
}


let optionList = document.getElementById('select-account');
optionList = Array.from(optionList.children);
optionList.forEach(option => {
    option.addEventListener('click',()=>{
        selectedOption.innerHTML = option.innerText;
        document.getElementById('select-account').style.display = 'none';
        dropIcon.setAttribute('class', 'fas fa-sort-down');
    })
});


//creat new user
function createUser(fullName, email, password, accountType){
    if(!localStorage.hasOwnProperty(email)){
        localStorage.setItem(email,{'fullName':fullName,'password':password,'accountType':accountType})
        
    
    }else{

    }
}
