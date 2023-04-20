export class FormValidator {
  constructor(settingsObject, formElement) {
    this._settingsObject = settingsObject;
    this._formElement = formElement;
  }

  // Метод включения валидации формы enableValidation
  enableValidation() {
    this._formElement.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners(this._formElement, this._settingsObject);
  };

  // Метод, который проверяет валидность поля и показывает/скрывает сообщение об ошибке
  _checkInputValidity(inputElement, formElement, rest) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем сообщение об ошибке
      this._showInputError(errorElement, inputElement, inputElement.validationMessage, rest);
    } else {
      // Если проходит, скроем
      this._hideInputError(errorElement, inputElement, rest);
    }
  };

  // Метод, который добавляет класс с ошибкой
  _showInputError(errorElement, inputElement, errorMessage, { inputErrorClass, errorClass }) {
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };

  // Метод, которая удаляет класс с ошибкой
  _hideInputError(errorElement, inputElement, { inputErrorClass, errorClass }) {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  // Проверяем все поля на валидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };

  // Метод изменения состояния кнопки сабмита
  _toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      this._disableButtonSubmit(buttonElement, { inactiveButtonClass });
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  // Метод сделать кнопку submit не активной при открытии попапа
  _disableButtonSubmit(buttonElement, { inactiveButtonClass }) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  };


  // Метод добавляющий все обработчики _setEventListeners
  // Добавление обработчиков всем полям формы
  _setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest }) => {
    // Найдём все поля текущей формы и сделаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(submitButtonSelector);

    formElement.addEventListener('reset', () => {
      this._disableButtonSubmit(buttonElement, rest)
    });

    this._toggleButtonState(inputList, buttonElement, rest);

    //Пройдемся по каждому импуту и вызовем для каждого из них функцию checkInputValidity
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, formElement, rest);
        // Вызовем функцию переключения состояния кнопки
        this._toggleButtonState(inputList, buttonElement, rest);
      });
    });
  };
}


