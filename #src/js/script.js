@@include('timer.js');
@@include('functions.js');
@@include('form.js');
@@include('scroll.js');
@@include('animation.js');

const removeSpaces = string => string.replace(/\s+/g, '').trim();

let progressValue = document.querySelector('.earn-progres__value');
let progressMaxValue = document.querySelector('.earn-progres__item_finish');
let progress = document.querySelector('.earn-progres__progress');

let width = parseInt(removeSpaces(progressValue.innerHTML)) / parseInt(removeSpaces(progressMaxValue.innerHTML));
progress.style.width = `${width * 100}%`;


let progressArr = document.querySelectorAll('.item-start__progress');
let progressHeight = 80;
for (let i = 0; i < progressArr.length; i++) {
    progressArr[i].style.height = `${progressHeight}px`;
    progressHeight -= 20;
}