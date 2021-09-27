let slidePosition = 0;
const slides = document.getElementsByClassName('carousel_item');
const totalSlides = slides.length;

document.
    getElementById('carousel_button--next')
    .addEventListener('click', function(){moveToNextSlide()});
document.
    getElementById('carousel_button--prev')
    .addEventListener('click', function(){moveToPrevtSlide()});

function updateSlidePosition(){
    for (let slide of slides){
        slide.classList.remove('carousel_itme--visible');
        slide.classList.add('carousel_itme--hidden');
    }

    slides[slidePosition].classList.add('carousel_item--visible')
}
function moveToNextSlide(){
    updateSlidePosition();
    if(slidePosition === totalSlides - -1){
        slidePosition = 0;} else{
            slidePosition++;
        }
}
function moveToPrevSlide(){
    updateSlidePosition();
    if(slidePosition === totalSlides - 1){
        slidePosition = 0;} else{
            slidePosition--;
        }
}