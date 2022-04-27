document.addEventListener("DOMContentLoaded", function () {
    const deadline = new Date(2022, 04, 10);
    let timerId = null;

    function declensionNum(num, words) {
        if (num === 1) {
            return words[0]
        } else {
            return words[1];
        }

    }
    function coutdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $days.dataset.title = declensionNum(days, ['day', 'days']);
        $hours.dataset.title = declensionNum(hours, ['hour', 'hours']);
        $minutes.dataset.title = declensionNum(minutes, ['minute', 'minutes']);
        $seconds.dataset.title = declensionNum(seconds, ['second', 'seconds',]);
    }
    const $days = document.querySelector('.timer__days');
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    coutdownTimer();
    timerId = setInterval(coutdownTimer, 1000);
});
function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
const header = document.querySelector('.header');
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        header.classList.toggle('_height');
    });
}


if (window.scrollY > 40) {
    header.classList.add('_active');
}

window.onscroll = function showHeader() {
    let header = document.querySelector(".header");
    if (window.pageYOffset > 40) {
        header.classList.add("_active");
    } else {
        header.classList.remove("_active");
    }
}


function ibg() {

    let ibg = document.querySelectorAll("._ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();

;
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
    for (let index = 0; index < forms.length; index++) {
        const el = forms[index];
        el.addEventListener('submit', form_submit);
    }
}

function form_submit(e) {
    let btn = event.target;
    let form = btn.closest('form');
    let message = form.getAttribute('data-message');
    let error = form_validate(form);
    if (error == 0) {
        form_clean(form);
        if (message) {
            /*popup_open('message - ' + message);*/
            //e.preventDefault();
        }
    } else {
        let form_error = form.querySelectorAll('._error');
        if (form_error && form.classList.contains('_goto-error')) {
            _goto(form_error[0], 1000, 50);
        }
        event.preventDefault();
    }
}

function form_validate(form) {
    let error = 0;
    let form_req = form.querySelectorAll('._req');
    if (form_req.length > 0) {
        for (let index = 0; index < form_req.length; index++) {
            const el = form_req[index];
            if (!_is_hidden(el)) {
                error += form_validate_input(el);
            }
        }
    }
    return error;
}

function _is_hidden(el) {
    el.hidden;
}

function form_validate_input(input) {
    let error = 0;
    let input_g_value = input.getAttribute('data-value');
    if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
        if (input.value != input_g_value) {
            let em = input.value.replace(" ", "");
            input.value = em;
        }
        if (!email_test(input.value) || input.value == input_g_value) {
            form_add_error(input);
            error++;
        } else {
            form_remove_error(input);
        }
    } else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
        form_add_error(input);
        error++;
    } else {
        if (input.value == '' || input.value == input_g_value) {
            form_add_error(input);
            error++;
        } else {
            form_remove_error(input);
        }
    }
    return error;
}

function email_test(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function form_add_error(input) {
    input.classList.add('_error');
    input.parentElement.classList.add('_error');
    let input_error = input.parentElement.querySelector('.form__error');
    if (input_error) {
        input.parentElement.removeChild(input_error);
    }
    let input_error_text = input.getAttribute('data-error');
    if (input_error_text && input_error_text != '') {
        input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
    }
}

function form_remove_error(input) {
    input.classList.remove('_error');
    input.parentElement.classList.remove('_error');
    let input_error = input.parentElement.querySelector('.form__error');
    if (input_error) {
        input.parentElement.removeChild(input_error);
    }
}

function form_clean(form) {
    let inputs = form.querySelectorAll('input,textarea');
    for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        el.parentElement.classList.remove('_focus');
        el.classList.remove('_focus');
        el.value = el.getAttribute('data-value');
    }
    let checkboxes = form.querySelectorAll('.checkbox__input');
    if (checkboxes.length > 0) {
        for (let index = 0; index < checkboxes.length; index++) {
            const checkbox = checkboxes[index];
            checkbox.checked = false;
        }
    }
    let selects = form.querySelectorAll('select');
    if (selects.length > 0) {
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            const select_default_valut = select.getAttribute('data-default');
            select.value = select_default_valut;
            select_item(select);
        }
    }
}

let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
    if (inputs.length > 0) {
        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];
            const input_g_value = input.getAttribute('data-value');
            input_placeholder_add(input);
            input.addEventListener('focus', function (e) {
                if (input.value == input_g_value) {
                    input.value = '';
                }

                if (input.classList.contains('_phone')) {
                    input.classList.add('_mask');
                    Inputmask("+380 (99) 9999999", {
                        clearIncomplete: true,
                        clearMaskOnLostFocus: true,
                        onincomplete: function () {
                            input_clear_mask(input, input_g_value);
                        }
                    }).mask(input);
                }

                form_remove_error(input);
            });

            input.addEventListener('blur', function (e) {
                if (input.value == '') {
                    input.value = input_g_value;
                }
            });
        }
    }
}

function input_placeholder_add(input) {
    const input_g_value = input.getAttribute('data-value');
    if (input.value == '' && input_g_value != '') {
        input.value = input_g_value;
    }
}



;

document.querySelectorAll('a[href^="#"').forEach(link => {

    link.addEventListener('click', function (e) {

        e.preventDefault();
        document.body.classList.remove('_lock');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');

        let href = this.getAttribute('href').substring(1);

        const scrollTarget = document.getElementById(href);

        const topOffset = document.querySelector('.header').offsetHeight;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});;
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll)
    function animOnScroll(params) {
        //showHeader();
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }

    }

    function offset(el) { //функция получения координатов элемента относительно верха или лева страницы
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);

};

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