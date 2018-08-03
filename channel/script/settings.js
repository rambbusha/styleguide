const settingsButton = document.querySelector('.nav-settings');
const settingsWrapper = document.querySelector('.settings');
const mainWrapper = document.querySelector('.wrapper');
const blackScreen = document.querySelector('.black-overlay');
const colapseButton = document.querySelector('.colapse-icon')

const closeSettings = () => {
  settingsButton.classList.remove('active');
  settingsWrapper.classList.remove('shown');
  mainWrapper.classList.remove('settings-on')
}

blackScreen.addEventListener('click', closeSettings);
colapseButton.addEventListener('click', closeSettings);

settingsButton.addEventListener('click', (e) => {
  settingsButton.classList.toggle('active');
  settingsWrapper.classList.toggle('shown');
  mainWrapper.classList.toggle('settings-on')
})

