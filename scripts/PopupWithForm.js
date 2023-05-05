import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormCardSubmit) {
    super(popupSelector);
    this._handleFormCardSubmit = handleFormCardSubmit.bind(this);
    this._placeInput = this._popupSelector.querySelector('.popup__field_text_name-place');
    this._linkInput = this._popupSelector.querySelector('.popup__field_text_link');
    this._popupFormAdd = document.forms['new-place'];
    //this._profileAddButton = document.querySelector('.profile__add-button');
  }

  // Собирает данные всех полей формы
  _getInputValues() {
    return {
      name: this._placeInput.value,
      link: this._linkInput.value,
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._handleFormCardSubmit);
  }

  close() {
    super.close();
    this._popupFormAdd.reset();
  }
}
