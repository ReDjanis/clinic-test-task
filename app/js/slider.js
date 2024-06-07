'use strict'

const cards = document.querySelectorAll('.services__exam'),
    sliderLine = document.querySelector('.slider__line'),
    sliderTouch = document.querySelector('.slider__touch'),
    currentCard = document.querySelector('#currentCard'),
    totalCards = document.querySelector('#totalCards'),
    prevBtn = document.querySelector('#prevBtn'),
    nextBtn = document.querySelector('#nextBtn');

let count = 0,
    width;

totalCards.textContent = cards.length;
let total = +totalCards.textContent;

width = showSlide(sliderLine, cards);

prevBtn.addEventListener('click', moveToPrevSlide);
nextBtn.addEventListener('click', moveToNextSlide);


window.addEventListener('resize', () => {
    width = showSlide(sliderLine, cards);
})

// ___________________________________________________________________
// Responsive Touch Slider 
let start, change;

sliderTouch.addEventListener('dragstart', (e) => {
    start = e.clientX;
})

sliderTouch.addEventListener('dragover', (e) => {
    e.preventDefault();
    let touch = e.clientX;
    change = start - touch;
})

sliderTouch.addEventListener('dragend', checkVarChange);

sliderTouch.addEventListener('touchstart', (e) => {
    start = e.touches[0].clientX;
})

sliderTouch.addEventListener('touchmove', (e) => {
    e.preventDefault();
    let touch = e.touches[0];
    change = start - touch.clientX;
})

sliderTouch.addEventListener('touchend', checkVarChange);

function checkVarChange() {

    if (change > 0) {
        moveToNextSlide();
    } else {
        moveToPrevSlide();
    }
}
// _________________________________________________________________
// functions

// показ слайдов
function showSlide(sliderLine, images) {
    let width = document.querySelector('.slider').offsetWidth;

    sliderLine.style.width = width * images.length + 'px';
   
    images.forEach(item => {
        item.style.width = width + 'px';
        item.style.height = 'auto';
        item.style.minHeight = '440px';
    });

    rollSliderNext(sliderLine, count, width);

    return width;
}

// задает шаг смещения слайдов - прокрутка назад
function rollSliderPrev(sliderLine, count, width) {
    let offset;
    if (count === 1) {
        offset = total - 1;

        sliderLine.style.transform = 'translate(-' + offset * width + 'px)';
    } else {
        offset = count - 2;
        sliderLine.style.transform = 'translate(-' + offset * width + 'px)';
    }
}

// задает шаг смещения слайдов - прокрутка вперед
function rollSliderNext(sliderLine, count, width) {

    if (count === total) {
        sliderLine.style.transform = 'translate(0px)';
    } else {
        sliderLine.style.transform = 'translate(-' + count * width + 'px)';
    }
}

function moveToPrevSlide() {
    count = +currentCard.textContent;

    rollSliderPrev(sliderLine, count, width);

    if (count === 1) {
        currentCard.textContent = +totalCards.textContent;
    } else {
        currentCard.textContent = count - 1;
    }
}

function moveToNextSlide() {
    count = +currentCard.textContent;

    rollSliderNext(sliderLine, count, width);

    if (count === total) {
        currentCard.textContent = 1;
    } else {
        currentCard.textContent = count + 1;
    }
}

