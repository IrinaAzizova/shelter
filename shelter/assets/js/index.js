'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const burgerBtn = document.querySelector('.burger-menu'),
          navMenu = document.querySelector('.nav');

    burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('burger-menu_active');
            navMenu.classList.toggle('nav_active');
    });
});