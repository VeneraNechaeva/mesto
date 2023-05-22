import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormCardSubmit, resetFormOnClose) {
    super(popupSelector);
    this._resetFormOnClose = resetFormOnClose;
    this._handleFormCardSubmit = handleFormCardSubmit.bind(this);
    this._form = this._popupElement.querySelector('form');
    this._popupButton = this._popupElement.querySelector('.popup__button');
  }
  // Собирает данные всех полей формы
  _getInputValues() {
    const inputs = {}
    Array.from(this._form.querySelectorAll('input')).forEach(element => {
      inputs[element.name] = element.value;
    });
    return inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      this._handleFormCardSubmit(evt, this._getInputValues(), this._popupButton)
    });
  }

  // Сбрасывается форма
  close() {
    super.close();
    if (this._resetFormOnClose) {
      this._form.reset();
    }
  }
}
