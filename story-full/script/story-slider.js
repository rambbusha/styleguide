const sliderBubles = document.querySelectorAll('.buble');
const sliderHolder = document.querySelector('ul.story-gallery');
const slides = document.querySelectorAll('.gallery-slide');
let activeSlide = Number(document.querySelector('.buble.active').dataset.index);
let clickable = true;

sliderBubles.forEach(el=>el.addEventListener('click',()=>{
  if(el.classList.contains('active') || !clickable) return;
  clickable = false;
  //Change the active pagination
  sliderBubles[activeSlide].classList.remove('active')
  el.classList.add('active');
  slides[activeSlide].classList.remove('active');
  activeSlide = el.dataset.index;
  if(activeSlide==0){
    sliderHolder.style.transform = `translateX(15%)`
  }else{
    sliderHolder.style.transform = `translateX(-${55 + 70 * (activeSlide-1) }%)`
  }
  
}))

sliderHolder.addEventListener('transitionend',(e)=>{
  if(e.srcElement != sliderHolder || e.propertyName != "transform") return;
  slides[activeSlide].classList.add('active');
  clickable = true;
})