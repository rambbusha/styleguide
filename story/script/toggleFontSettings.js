const fontSettingsButton = document.querySelectorAll('.aa');
const fontSettingsWrapper = document.querySelector('.fonts-settings-wrapper')
const arrows = document.querySelectorAll('.typeface-arrow');
const fontsList = document.querySelector('.typfaces-list');
const body = document.querySelector('body');
const luminosityButtons = document.querySelectorAll('.luminosity div')

const fonts = ['Montserrat', 'sans-serif', 'cursive', 'fantasy', 'serif']

const toggleFontSettings = () => fontSettingsWrapper.classList.toggle('down')

fontSettingsButton.forEach(el => el.addEventListener('click', toggleFontSettings))

let activeId = 0;

arrows.forEach(el => el.addEventListener('click', () => {
    if (!el.classList.contains('active')) return;
    let to = Number(el.dataset.to);
    activeId += to;
    fontsList.style.transform = `translateX(${-154 * activeId}px)`;
    body.style.fontFamily = fonts[activeId]
    if (activeId == 0) {
        arrows[0].classList.remove('active')
    } else if (activeId == fonts.length - 1) {
        arrows[1].classList.remove('active')
    } else {
        arrows.forEach(arrow => arrow.classList.add('active'));
    }
}))

luminosityButtons.forEach(el => el.addEventListener('click', (e) => {
    if (el.classList.contains('active')) return;
    const type = el.dataset.for;
    document.querySelector('.luminosity .active').classList.remove('active');
    el.classList.add('active');
    if (type == 'sun') {
        body.style.filter = 'brightness(1)'
    } else {
        body.style.filter = 'brightness(.8)'
    }
}))