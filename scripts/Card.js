import { openImg } from './utils.js';

export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._data = data;
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
  _setEventListeners(cardLikeButton, cardDeleteButton) {

    cardLikeButton.addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });

    cardDeleteButton.addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);
    });
  }

  // Подготовка карточки к публикации
  generateCard() {
    this._element = this._getTemplate();
    const cardLikeButton = this._element.querySelector('.element__icon-like');
    const cardDeleteButton = this._element.querySelector('.element__delete-button');
    this._setEventListeners(cardLikeButton, cardDeleteButton);

    this._element.querySelector('.element__image').src = this._data.link;
    this._element.querySelector('.element__text').textContent = this._data.name;
    openImg(this._element, this._data);

    return this._element;
  }
}

