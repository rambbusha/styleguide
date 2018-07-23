const fontSettingsButton = document.querySelectorAll('.aa');
const fontSettingsWrapper = document.querySelector('.fonts-settings-wrapper')

const toggleFontSettings = () => fontSettingsWrapper.classList.toggle('down')

fontSettingsButton.forEach(el=>el.addEventListener('click',toggleFontSettings))