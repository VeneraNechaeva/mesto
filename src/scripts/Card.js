export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._handleCardClick = handleCardClick;
  }

  // Возвращаю разметку
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // Метод обработки событий (Лайк карточки)
  _handleLikeCard(evt) {
    evt.target.classList.toggle('element__icon-like_active');
  }

  // Метод обработки событий (Удаление карточки)
  _handleDeleteCard(evt) {
    evt.target.closest('.element').remove();
  }

  // Метод добавляющий все обработчики
  _setEventListeners() {

    this._cardLikeButton.addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });

    this._cardDeleteButton.addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link)
    });
  }

  // Подготовка карточки к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._cardLikeButton = this._element.querySelector('.element__icon-like');
    this._cardDeleteButton = this._element.querySelector('.element__delete-button');
    this._cardImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._element.querySelector('.element__text').textContent = this._data.name;

    return this._element;
  }
}



