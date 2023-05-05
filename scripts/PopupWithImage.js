import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupText = this._popupSelector.querySelector('.popup__text');
  }
  // Вставляет в попап картинку с src изображения и подписью к картинке
  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupText.textContent = name;
  }
}
