export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Отвечает за открытие попапа
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Отвечает за закрытие попапа
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);

  }

  // Содержит логику закрытия попапа по Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  // Слушатель клика для "X" и на Оверлей
  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        this.close()
      }
    });
  }
}
