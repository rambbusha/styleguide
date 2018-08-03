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
let firstPassword;
let step = 1;

nameInput.addEventListener('focus', () => {
	if (nameTooltip.classList.contains('show')) {
		nameTooltip.classList.remove('show');
	}
})

passwordInput.addEventListener('focus', () => {
	passwordTooltip.classList.remove('show');
})

emailInput.addEventListener('focus', () => {
	emailTooltip.classList.remove('show');
})



singUpForm.addEventListener('submit', (e) => {
	e.preventDefault();
	if (document.querySelector('.sign-up-tooltip.show')) return;
	//test name
	if (!(/^[a-z0-9]{3,15}$/).test(nameInput.value)) {
		nameTooltip.classList.add('show');
		return;
	}
	//test email
	if (emailInput.value == '') {
		document.querySelector('.email-tooltip').classList.add('show')
		return;
	}
	//test password
	const passValue = passwordInput.value;
	if (passValue.length < 5 || !(/[0-9]/).test(passValue) || !(/^[a-z0-9_-]{3,20}$/).test(passValue)) {
		passwordTooltip.classList.add('show')
		return
	}
	firstPassword = passValue;
	showWaitngStatus(singUpForm);
	window.setTimeout(() => {
		veifyFormState(singUpForm, true) //must check with the server it is true or false, placeholder atm
	}, Math.floor(Math.random() * 1000) + 1000) //fake waiting server time
})

verifyForm1.addEventListener('submit', (e) => {
	e.preventDefault();
	showWaitngStatus(verifyForm1);
	window.setTimeout(() => {
		passed = verifyForm1.querySelector('#secret-code').value ? true : false;
		veifyFormState(verifyForm1, passed)
	}, Math.floor(Math.random() * 1000) + 1000) //fake waiting server time
})

verifyForm2.addEventListener('submit', (e) => {
	e.preventDefault();
	showWaitngStatus(verifyForm2);
	window.setTimeout(() => {
		const passed = verifyForm2.querySelector('input[type="password"]').value == firstPassword;
		veifyFormState(verifyForm2, passed, "http://localhost/styleguide/walk-through/")
	}, Math.floor(Math.random() * 1000) + 1000) //fake waiting server time

})

/* show loading */
function showWaitngStatus(form) {
	form.classList.add('waiting');
	form.querySelector('.submit-wrapper input').value = '';
}

/* Pss or not the stage */
function veifyFormState(form, passOrNot, redirectUrl = false) {
	if (passOrNot) {
		form.querySelector('.states').classList.add('complete');
		if (redirectUrl) {
			window.setTimeout(() => window.location.replace(redirectUrl), 1500)
		} else {
			window.setTimeout(() => showNextForm(), 1000) //show next form after 1s
		}
	} else {
		form.querySelector('.states').classList.add('fail');
		//the user has done something wrong let him do it again, restart the form
		form.querySelector('.main-tooltip').classList.add('show');
		window.setTimeout(() => {
			form.classList.remove('waiting');
			form.querySelector('.submit-wrapper input').value = 'Continue';
			form.querySelector('.states').classList.remove('fail');
			form.querySelector('.main-tooltip').classList.remove('show');
		}, 1500)

	}

}


/* show the next form */
function showNextForm() {
	document.querySelector(`.line.to-${step + 1} .inner-line`).style.width = '100%'
	bubles[step - 1].classList.remove('active');
	bubles[step].classList.add('active');
	const last = formSteps[step - 1];

	last.style.opacity = '0';
	last.addEventListener('transitionend', (e) => {
		last.style.display = 'none';
		formSteps[step - 1].style.display = 'flex'
		window.setTimeout(() => formSteps[step - 1].style.opacity = '1', 600)

		// formSteps[step - 1].addEventListener('animationend', (e) => {
		// 	formSteps[step - 1].style.opacity = '1'
		// })
	})
	step++
}
