//Объект настроек
const settingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
};

//ФУНКЦИЯ ВКЛЮЧЕНИЯ ВАЛИДАЦИИ ФОРМЫ
//Выбираем ФОРМУ из массива и добавляем обработчик
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => evt.preventDefault());

    setEventListeners(formElement, rest);
  });
};


//Добавление обработчиков всем полям формы
//Выбираем ИМПУТ из массива и накладываем обработчик
const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
  // Найдём все поля текущей формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(submitButtonSelector);

  formElement.addEventListener('reset', () => {
    disableButtonSubmit(buttonElement, rest)
  });

  toggleButtonState(inputList, buttonElement, rest);

  //Пройдемся по каждому импуту и вызовем для каждого из них функцию checkInputValidity
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, formElement, rest);
      // Вызовем функцию переключения состояния кнопки
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};


// Функция, которая проверяет валидность поля и показывает/скрывает сообщение об ошибке
const checkInputValidity = (inputElement, formElement, rest) => {
  // const inputName = inputElement.getAttribute('name');
  // const errorElement = document.getElementById(`${inputName.id}-error`);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем сообщение об ошибке
    showInputError(errorElement, inputElement, inputElement.validationMessage, rest);
  } else {
    // Если проходит, скроем
    hideInputError(errorElement, inputElement, rest);
  }
};


// Функция, которая добавляет класс с ошибкой
const showInputError = (errorElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};


// Функция, которая удаляет класс с ошибкой
const hideInputError = (errorElement, inputElement, { inputErrorClass, errorClass }) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};


//ДЕЛАЕМ КНОПКУ НЕАКТИВНОЙ
//Проверяем все поля на валидность, проходя по массиву методом some,
//что бы настороить статус кнопки
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};


//ФУНКЦИЯ СОСТОЯНИЯ КНОПКИ ПЕРЕКЛЮЧЕНИЯ
//Влючает и оключает кнопку
const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass }) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disableButtonSubmit(buttonElement, {inactiveButtonClass});
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};


// Функция сделать кнопку submit не активной при открытии попапа
const disableButtonSubmit = (buttonElement, { inactiveButtonClass }) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", "disabled");
};

enableValidation(settingsObject);


