const singUpForm = document.querySelector('form.sign-up');
const verifyForm1 = document.querySelector('form.verify-email');
const verifyForm2 = document.querySelector('form.verify-email2');
const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('passwordz');
const emailInput = document.getElementById('emailz');
const emailTooltip = document.querySelector('.email-tooltip')
const passwordTooltip = document.querySelector('.password-tooltip');
const nameTooltip = document.querySelector('.name-tooltip');
const bubles = document.querySelectorAll('.buble');
const formSteps = document.querySelectorAll('.form-step');
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
    veifyFormState(singUpForm)
})

verifyForm1.addEventListener('submit' , (e)=>{
    e.preventDefault();
    veifyFormState(verifyForm1)
})


/* show loading and pass or not */
function veifyFormState(form){
    
    form.classList.add('waiting');
    form.querySelector('.submit-wrapper input').value = '';

    window.setTimeout(() =>{
        form.querySelector('.states').classList.add('complete')
        window.setTimeout(()=> showNextForm(), 1000) //show next form after 1s
    } , Math.floor(Math.random()*1000)+1000 ) //fake waiting server time

}





/* show the next form */
function showNextForm(){
    document.querySelector(`.line.to-${step+1} .inner-line`).style.width = '100%'
    bubles[step-1].classList.remove('active');
    bubles[step].classList.add('active');
    
    const last = formSteps[step-1];

    last.style.opacity = '0';
    last.addEventListener('transitionend' , (e)=>{
        last.style.display = 'none';
        formSteps[step-1].style.display = 'flex'
        formSteps[step-1].addEventListener('animationend',(e)=>{
            formSteps[step-1].style.opacity = '1'
        })
    })
    step++
}
