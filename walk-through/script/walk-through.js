
const totalSteps = 4; //all the steps
let actualStep = 1; //keep track where the user is at

const margin = 5; //the li margins to add to the width when traslate the UL * index of li + 1

const cardsHolder = document.querySelector('.steps-info');
const stepCards = [...cardsHolder.querySelectorAll('.step-info')];
const stepsCounterHolder = document.querySelector('.steps-count');
const innerBar = document.querySelector('.progress-indicator-inner');
const tooltips = [...document.querySelectorAll('.tooltip')]

const tooltipButtons = document.querySelectorAll('.tooltip-btn');

const fillBar = (percent) => innerBar.style.width = `${percent}%`;

console.log(tooltips)
//make the cards move , Mobile walkthrough
stepCards.forEach((el,idx)=>el.addEventListener('click',(e)=>{
    let lastActiveCard = cardsHolder.querySelector('.active');

    if(idx > stepCards.indexOf(lastActiveCard)){
        actualStep++
    }else{
        actualStep--
    }
    stepsCounterHolder.innerText = `${actualStep} of ${totalSteps}`;
    lastActiveCard.classList.remove('active');
    fillBar(Math.round((actualStep-1)/(totalSteps-1)*100))
    console.log((actualStep-1)/(totalSteps-1))
    
    stepCards[idx].classList.add('active');
    cardsHolder.style.transform = `translateX(-${85 * idx + 5 * idx }px)`;
}))

console.log(tooltipButtons)
//tablets walkthrough
tooltips[0].classList.add('active');
tooltipButtons.forEach((el,idx)=>el.addEventListener('click',(e)=>console.log(el.dataset['for'])))