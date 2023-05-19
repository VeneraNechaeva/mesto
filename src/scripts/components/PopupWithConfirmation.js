import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormConfirmSubmit) {
    super(popupSelector);
    this._handleFormConfirmSubmit = handleFormConfirmSubmit.bind(this);
  }

  open(evt, card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      this._handleFormConfirmSubmit(evt, this._card);
      this.close();
    });
  }
}
