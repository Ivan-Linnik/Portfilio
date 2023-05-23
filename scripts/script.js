'use strict';
//========================Toggle theme of the site=====================//
const body = document.body;
const toggleTheme = document.getElementById('toggle-theme');

function handleToggleTheme() {
    if (toggleTheme.checked) {
        body.setAttribute('dark', '');
        localStorage.setItem('setTheme', toggleTheme.checked);

    } else if (toggleTheme.checked == false) {
        body.removeAttribute('dark');
        localStorage.setItem('setTheme', toggleTheme.checked);
    }
}

toggleTheme.addEventListener('click', handleToggleTheme);

//========================Toggle language of the site=====================//
const wordsOnPage = {
    'title': {
        'ru': 'Иван Линник',
        'en': 'Ivan Linnik',
    },
    'nav__about': {
        'ru': 'обо мне',
        'en': 'about me',
    },
    'nav__works': {
        'ru': 'мои работы',
        'en': 'my works',
    },
    'nav__contacts': {
        'ru': 'контакты',
        'en': 'contacts',
    },
    'toggle__rus': {
        'ru': 'ру',
        'en': 'rus',
    },
    'toggle__eng': {
        'ru': 'eng',
        'en': 'eng',
    },
    'summary': {
        'ru': 'скачать резюме',
        'en': 'download summary',
    },
    'worker-info': {
        'ru': 'Джуниор фронтенд разработчик',
        'en': 'Junior Frontend developer',
    },
    'age-city': {
        'ru': '28 лет, Батайск',
        'en': '28 y.o., Bataysk',
    },
    'works-header': {
        'ru': 'мои работы',
        'en': 'my works',
    },
    'calculator': {
        'ru': 'калькулятор',
        'en': 'calculator',
    },
    'thisSite': {
        'ru': 'этот сайт',
        'en': 'this site',
    },
    'something': {
        'ru': 'что-то ещё',
        'en': 'something else',
    },
}

const langSwitcher = document.getElementById('languages-input');

function changeLang() {
    if (langSwitcher.checked) {
        changeLang.lang = 'en';
        document.querySelector('title').innerText = wordsOnPage['title'][changeLang.lang];
        localStorage.setItem('setLang', langSwitcher.checked);
    } else {
        changeLang.lang = 'ru';
        document.querySelector('title').innerText = wordsOnPage['title'][changeLang.lang];
        localStorage.setItem('setLang', langSwitcher.checked);
    }

    for (let key of Object.keys(wordsOnPage)) {
        let elem = document.querySelector('.lng-' + key);

        if (elem) {
            elem.innerText = wordsOnPage[key][changeLang.lang];
        }
    }
}

langSwitcher.addEventListener('click', changeLang);

//========================Check local storage for checkboxes condition=====================//
function checkStorage() {
    if (localStorage.getItem('setLang') === 'true') {
        langSwitcher.checked = true;
        changeLang();
    }
    if (localStorage.getItem('setTheme') === 'true') {
        toggleTheme.checked = true;
        handleToggleTheme();
    }
}

checkStorage();

//========================Realising menu-burger work=====================//
const menu = document.querySelector('.header__service');
const menuBurger = document.querySelector('.header__burger');

function burgerWork() {
    if (menuBurger) {
        menuBurger.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuBurger.classList.toggle('active');
            body.classList.toggle('lock');
            document.querySelector('.content').classList.toggle('hidden');
        });
    }

    document.querySelectorAll('.navigation__link').forEach(elem => {
        elem.addEventListener('click', () => {
            menu.classList.remove('active');
            menuBurger.classList.remove('active');
            body.classList.remove('lock');
            document.querySelector('.content').classList.remove('hidden');
        });
    });
}

burgerWork();

//========================Realising smooth scroll by anchors=====================//
{
    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let item of Object.values(anchors)) {
        if (item.classList.contains('navigation__link')) {
            item.addEventListener('click', event => {
                event.preventDefault();

                const blockId = item.getAttribute('href').substring(1);

                document.getElementById(blockId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        }
    }
}

//========================Initialise swiper=====================//
const swiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: false,
        dynamicBullets: true,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    mousewheel: {
        sensitivity: 1,
        eventsTarget: '.swiper-wrapper',
        forceToAxis: true,
    },
    loop: true,
});

//========================Calculator===========================//
const calculator = document.querySelector('.calc-body');
const calcScreen = document.querySelector('.calc-screen');

calculator.addEventListener('click', startCalculator);

const operators = ['+', '-', 'X', '/', '%'];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const condition = {
    value1: '',
    value2: '',
    operator: '',
};

function startCalculator(event) {
    if (!event.target.classList.contains('button')) return;

    const whatPressed = event.target.value;

    switch (whatPressed) {
        case 'AC':
            calcScreen.value = '';
            condition.value1 = '';
            condition.value2 = '';
            condition.operator = '';
            break;

        case 'C':
            calcScreen.value = calcScreen.value.substr(0, calcScreen.value.length - 1);

            if (condition.value1 && !condition.operator && !condition.value2) {

                condition.value1 = condition.value1.substring(0, condition.value1.length - 1);

                break;
            }
            if (condition.operator && !condition.value2) condition.operator = '';

            if (condition.value1 && condition.operator && condition.value2) {

                condition.value2 = condition.value2.substring(0, condition.value2.length - 1);

                break;
            }

            break;

        case '=':
            if (condition.value2 === '') condition.value2 = condition.value1;

            calcScreen.value = calculations();
            condition.value1 = calcScreen.value;
            calcScreen.value = condition.value1;
            condition.value2 = '';
            condition.operator = '';

            break;

        default:
            if (operators.includes(whatPressed) && !condition.value1) break;

            calcScreen.value += whatPressed;

            break;
    }

    if (digits.includes(whatPressed)) {

        if (condition.value1 === '' && condition.operator === '') {

            condition.value1 += whatPressed;
            calcScreen.value = condition.value1;

        } else if (condition.value1 && !condition.operator) {

            if (condition.value1.includes('.') && whatPressed === '.') {

                calcScreen.value = condition.value1.substring(-1);

                return;
            }

            condition.value1 += whatPressed;

            ///////////////////////////////////////////////////////////////////////////////////
            if (condition.value1.length > 7) {

                condition.value1 = condition.value1.substring(0, 7);
                calcScreen.value = condition.value1 + condition.operator;
            };
            ////////////////////////////////////////////////////////////////////////////////////

            if (condition.value1.startsWith('.')) {

                condition.value1 = ('0' + condition.value1);
                calcScreen.value = ('0' + calcScreen.value);

            } else if (condition.value1.startsWith('0') && !condition.value1.includes('.')) {

                condition.value1 = condition.value1.substring(1);
                calcScreen.value = calcScreen.value.substring(1);
            }

        } else if (condition.value1 && condition.operator) {

            if (condition.value2.includes('.') && whatPressed === '.') {

                calcScreen.value = condition.value1 + condition.operator + condition.value2.substring(-1);

                return;
            }

            condition.value2 += whatPressed;

            ///////////////////////////////////////////////////////////////////////////////////
            if (condition.value2.length > 7) condition.value2 = condition.value2.substring(0, 7);

            if (calcScreen.value.length > 7) calcScreen.value = condition.value2;

            ////////////////////////////////////////////////////////////////////////////////////
        }

        if (condition.value2.startsWith('.')) {

            condition.value2 = ('0' + condition.value2);
            calcScreen.value = condition.value1 + condition.operator + condition.value2;

        } else if (condition.value2.startsWith('0') && !condition.value2.includes('.')) {

            condition.value2 = condition.value2.substring(1);
            calcScreen.value = condition.value1 + condition.operator + condition.value2;

            if (condition.value2.length < 1) {

                condition.value2 = '0';
                calcScreen.value = condition.value1 + condition.operator + condition.value2;
            }

        }
    }

    if (operators.includes(whatPressed) && condition.value1) {

        if (condition.value2 && condition.operator) {

            calcScreen.value = condition.value1 + condition.operator + condition.value2;

            return;
        }

        condition.operator = whatPressed;
        calcScreen.value = condition.value1 + condition.operator + condition.value2;
    }


    function calculations(value1, operator, value2) {
        value1 = parseFloat(condition.value1);
        value2 = parseFloat(condition.value2);
        operator = condition.operator;

        calculations.result = '';

        switch (operator) {
            case '+':
                calculations.result = value1 + value2;

                break;

            case '-':
                calculations.result = value1 - value2;

                break;

            case 'X':
                calculations.result = value1 * value2;

                break;

            case '/':
                if (value2 === 0) return value1;
                if (value1 === 0 && value2 === 0) return 0;

                calculations.result = value1 / value2;

                break;

            case '%':
                if (value1 === 0 || value2 === 0) return 0;

                calculations.result = value2 / 100 * value1;

                break;

            default:
                calculations.result = calcScreen.value;
        }

        return calculations.result;
    }
}