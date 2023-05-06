export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  // Отвечает за открытие попапа
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  // Отвечает за закрытие попапа
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  // Содержит логику закрытия попапа по Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_opened');
      if (activePopup !== null) {
        this.close()
      };
    };
  }

  // Слушатель клика для "X" и на Оверлей
  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        this.close()
      }
    });
  }
}
