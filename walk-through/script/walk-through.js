
const totalSteps = 4; //all the steps
let actualStep = 1; //keep track where the user is at

const margin = 5; //the li margins to add to the width when traslate the UL * index of li + 1

const mobileWalk = document.querySelector('.mobile-walk-through');
const cardsHolder = mobileWalk.querySelector('.steps-info');
const stepCards = [...cardsHolder.querySelectorAll('.step-info')]; //mobile ones
const doneButton = mobileWalk.querySelector('.done-button');
const stepsCounterHolder = mobileWalk.querySelector('.steps-count');
const innerBar = mobileWalk.querySelector('.progress-indicator-inner');
const tooltips = [...document.querySelectorAll('.tooltip')]

const tooltipButtons = document.querySelectorAll('.tooltip-btn');

const fillBar = (percent) => innerBar.style.width = `${percent}%`;


//make the cards move , Mobile walkthrough
stepCards.forEach((el,idx)=>el.addEventListener('click',(e)=>{
    let lastActiveCard = cardsHolder.querySelector('.active');

    if(idx > stepCards.indexOf(lastActiveCard)){
        actualStep++
    }else{
        actualStep--
    }
    
    if(actualStep==stepCards.length){
        doneButton.style.display = 'block'
    }else{
        doneButton.style.display = 'none'
    }

    stepsCounterHolder.innerText = `${actualStep} of ${totalSteps}`;
    lastActiveCard.classList.remove('active');
    fillBar(Math.round((actualStep-1)/(totalSteps-1)*100))
    console.log(Math.round((actualStep-1)/(totalSteps-1)*100))
    
    stepCards[idx].classList.add('active');
    cardsHolder.style.transform = `translateX(-${85 * idx + 5 * idx }px)`;
}))

doneButton.addEventListener('click' , () => {
    mobileWalk.classList.add('hidden');
    window.setTimeout(()=>mobileWalk.style.display='none' , 400)
})





//tablets walkthrough
tooltips[0].classList.add('active');
tooltipButtons.forEach((el,idx)=>el.addEventListener('click',(e)=>{
    const action = el.dataset.for;
    const activeTooltip = document.querySelector('.tooltip.active');
    const activeId = tooltips.indexOf(activeTooltip);
    if(action=='next'){
        activeTooltip.classList.remove('active')
        const nextItem = tooltips[activeId+1];
        const distanceFromTop = nextItem.parentElement.offsetTop + nextItem.offsetTop;
        if(distanceFromTop > window.innerHeight/2){
            window.scrollTo({
                top: distanceFromTop/2,
                behavior: "smooth"
            });
        }
        nextItem.classList.add('active')
    }else if(action=='prev'){
        activeTooltip.classList.remove('active')
        tooltips[activeId-1].classList.add('active')
    }else{
        tooltips.forEach(item=>item.style.display='none')
    }
}))