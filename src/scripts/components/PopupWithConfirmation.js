import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormConfirmSubmit) {
    super(popupSelector);
    this._handleFormConfirmSubmit = handleFormConfirmSubmit.bind(this);
  }

  open(evt, item) {
    super.open();
    this._item = item;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      this._handleFormConfirmSubmit(evt, this._item);
    });
  }
}
