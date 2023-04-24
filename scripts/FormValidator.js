export class FormValidator {
  constructor(settingsObject, formElement) {
    this._settingsObject = settingsObject;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settingsObject.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settingsObject.submitButtonSelector);
    this._errorElements = {};
    this._inputList.forEach(inputElement => {
      const error = this._formElement.querySelector(`.${inputElement.id}-error`);
      this._errorElements[inputElement.id] = error;
    });
  }

  // Метод включения валидации формы enableValidation
  enableValidation() {
    this._formElement.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners();
  };

  // Метод, который проверяет валидность поля и показывает/скрывает сообщение об ошибке
  _checkInputValidity(inputElement) {
    const errorElement = this._errorElements[inputElement.id];
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем сообщение об ошибке
      this._showInputError(errorElement, inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(errorElement, inputElement);
    }
  };

  // Метод, который добавляет класс с ошибкой
  _showInputError(errorElement, inputElement, errorMessage) {
    inputElement.classList.add(this._settingsObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settingsObject.errorClass);
  };

  // Метод, которая удаляет класс с ошибкой
  _hideInputError(errorElement, inputElement) {
    inputElement.classList.remove(this._settingsObject.inputErrorClass);
    errorElement.classList.remove(this._settingsObject.errorClass);
    errorElement.textContent = '';
  };

  // Проверяем все поля на валидность
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };

  // Метод изменения состояния кнопки сабмита
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._disableButtonSubmit();
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._settingsObject.inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  // Метод сделать кнопку submit не активной при открытии попапа
  _disableButtonSubmit() {
    this._buttonElement.classList.add(this._settingsObject.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "disabled");
  };

  // Метод очистки полей от ошибки
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      const errorElement = this._errorElements[inputElement.id];
      this._hideInputError(errorElement, inputElement);
    });
  }

  // Метод добавляющий все обработчики _setEventListeners
  // Добавление обработчиков всем полям формы
  _setEventListeners = () => {
    this._formElement.addEventListener('reset', () => {
      this._disableButtonSubmit();
    });
    this._toggleButtonState();

    //Пройдемся по каждому импуту и вызовем для каждого из них функцию checkInputValidity
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        // Вызовем функцию переключения состояния кнопки
        this._toggleButtonState();
      });
    });
  };
};



