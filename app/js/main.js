'use strict'
// Форма с валидацией
let buttons = document.querySelectorAll(`[data-request]`);
const form = document.form;
const buttonSubmit = document.querySelector('.form__submit-btn');
let arrElementsForm = Array.from(form.elements).filter(item => !!item.name);

const modalForm = document.querySelector('.modal-form');
const modalAlertForm = document.querySelector('.modal-form__alert');
const modalWrpForm = document.querySelector('.form');
const modalCloseForm = document.querySelector('.form__btn');

// модальное окно с текстом сообщения
const modalWindowMessage = document.querySelector('.modal-message');
const modalBtnMessage = document.querySelector('.modal-message__btn');

const loader = document.querySelector('.loader');

buttons.forEach(el => {
    el.addEventListener('click', () => {
        document.body.classList.add("scroll-lock");
        modalForm.showModal();
    })
})

modalForm.addEventListener("click", closeOnBackDropClickOrBtn);
modalCloseForm.addEventListener('click', () => {
    modalForm.click();
})
showButtonToClose(modalWrpForm, modalAlertForm);

form.addEventListener('submit', formSend)

modalBtnMessage.addEventListener('click', () => {
    cleaningInputs(arrElementsForm);
    modalWindowMessage.style.display = "none";
    modalWindowMessage.close();
})

async function formSend(e) {
    e.preventDefault();

    let booleanCheckValidate = true;
    arrElementsForm.forEach((input) => {

        const textErr = document.querySelector(`[data-group=${input.name}]`);

        switch (input.name) {

            case 'nameUser':

                if (input.value.trim() === '') {
                    paintRed(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && false;
                } else if (!validateName(input.value.trim())) {
                    paintRed(textErr, input);
                    textErr.textContent = 'имя введено некорректно';
                    booleanCheckValidate = booleanCheckValidate && false;
                } else {
                    paintByDefault(textErr, input);
                    textErr.textContent = 'обязательно для заполнения';
                    booleanCheckValidate = booleanCheckValidate && true;
                }
                break;
            case 'email':

                if (input.value.trim() === '') {
                    paintRed(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && false;
                } else if (!validateEmail(input.value)) {
                    paintRed(textErr, input);
                    textErr.textContent = 'email введен некорректно';
                    booleanCheckValidate = booleanCheckValidate && false;
                } else {
                    paintByDefault(textErr, input);
                    textErr.textContent = 'обязательно для заполнения';
                    booleanCheckValidate = booleanCheckValidate && true;
                }
                break;
            case 'textMessage':

                if (input.value.trim() === '') {
                    paintRed(textErr, input);
                    booleanCheckValidate = booleanCheckValidate && false;
                } else if (!validateName(input.value.trim())) {
                    paintRed(textErr, input);
                    textErr.textContent = 'сообщение введено некорректно';
                    booleanCheckValidate = booleanCheckValidate && false;
                } else {
                    paintByDefault(textErr, input);
                    textErr.textContent = 'обязательно для заполнения';
                    booleanCheckValidate = booleanCheckValidate && true;
                }
                break;
        }
    });

    const data = serializeForm(form); // получаем данные формы

    if (booleanCheckValidate) {
        loader.style.display = 'block';

        const response = await sendData({
            name: data.get('nameUser'),
            email: data.get('email'),
            message: data.get('textMessage')
        }); // отправляем данные на почту
        if (response.ok) {
            alert("Данные отправлены"); // .. что данные отправлены
            loader.style.display = 'none';
            modalWindowMessage.style.display = "flex";
            modalWindowMessage.showModal();
        } else {
            loader.style.display = 'none';
            alert("Код ошибки: " + response.status); // если not OK - показываем код ошибки
        }
    }
}

function serializeForm(formNode) {
    // формируем данные формы
    return new FormData(formNode);
}

async function sendData(data) {
    return await fetch("sendmail.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        }
    });
}

// показывать/скрывать кнопку Закрыть в модалке
function showButtonToClose(divModal, button) {
    let widthWindow = 991;
    if (window.innerWidth > widthWindow) {
        divModal.addEventListener('mouseenter', () => {
            button.style.display = 'none';
        })
        divModal.addEventListener('mouseleave', () => {
            button.style.display = 'block';
        })
    }
}

// закрытие модального окна при клике на подложку и на кнопку Закрыть
function closeOnBackDropClickOrBtn({ currentTarget, target }) {
    let isClickedOnBackDrop = target === currentTarget;
    let isClickedOnButton = target === modalAlertForm;

    if (isClickedOnBackDrop || isClickedOnButton) {
        document.body.classList.remove("scroll-lock");

        cleaningInputs(arrElementsForm);

        modalForm.close();
        arrElementsForm.forEach((input) => {
            const textErr = document.querySelector(`[data-group=${input.name}]`);
            paintByDefault(textErr, input);
            textErr.textContent = 'обязательно для заполнения';
        })
    }
}

function cleaningInputs(arr) {
    arr.forEach((item) => {
        item.value = '';
    });
}

function paintRed(text, frame) {
    text.style.color = 'red';
    frame.style.border = '3px solid red';
}

function paintByDefault(text, frame) {
    text.style.color = '#364844';
    frame.style.border = '1.5px solid #0DBC91';
}

function validateName(name) {
    const re = /[а-яА-ЯЁё]/;
    return re.test(name);
}
// Проверка email'a:
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

