'use strict'

const burgerBtn = document.querySelector('#check-menu');
const burgerLabel = document.querySelector('.burger__label');
const burgerMenu = document.querySelector('.burger__content');
const burgerMenuItem = document.querySelectorAll('.burger__item');

burgerLabel.addEventListener('click', () => {

    if (!burgerBtn.checked) {
        burgerMenu.classList.remove('burger__content-close');
        document.body.classList.add("scroll-lock");
    } else {
        burgerMenu.classList.add('burger__content-close');
        document.body.classList.remove("scroll-lock");
    }
})

burgerMenuItem.forEach((item) => {
    item.addEventListener('click', () => {
        burgerMenu.classList.add('burger__content-close');
        document.body.classList.remove("scroll-lock");
        burgerBtn.checked = false;
    })
})

