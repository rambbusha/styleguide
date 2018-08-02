const singUpForm = document.querySelector('form.sign-up');
const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('passwordz');
const emailInput = document.getElementById('emailz');
const emailTooltip = document.querySelector('.email-tooltip')
const passwordTooltip = document.querySelector('.password-tooltip');
const nameTooltip = document.querySelector('.name-tooltip');
const bubles = document.querySelectorAll('.buble');

let step = 1;

nameInput.addEventListener('focus',()=>{
    if(nameTooltip.classList.contains('show')){
        nameTooltip.classList.remove('show');
    }
    
})

passwordInput.addEventListener('focus',()=>{
    passwordTooltip.classList.remove('show');
})

emailInput.addEventListener('focus',()=>{
    emailTooltip.classList.remove('show');
})

singUpForm.addEventListener('submit' , (e) => {
    e.preventDefault();

    if(document.querySelector('.sign-up-tooltip.show')) return;
    
    //test name
    if(!(/^[a-z0-9]{3,15}$/).test(nameInput.value)){
        nameTooltip.classList.add('show');
        return;
    }

    //test email
    if(emailInput.value == ''){
        document.querySelector('.email-tooltip').classList.add('show')
        return;
    }

    //test password
    const passValue = passwordInput.value;
    if(passValue.length < 5 || !(/[0-9]/).test(passValue) || !(/^[a-z0-9_-]{3,20}$/).test(passValue)){
        passwordTooltip.classList.add('show')
        return
    }

    document.querySelector(`.line.to-${step+1} .inner-line`).style.width = '100%'
    bubles[step-1].classList.remove('active');
    bubles[step].classList.add('active');
})