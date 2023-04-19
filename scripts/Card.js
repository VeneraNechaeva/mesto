//Шесть карточек «из коробки»
import { initialCards } from './constants.js';



class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
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

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__text').textContent = this._name;

    return this._element;
  }
}

// Публикация карточек
initialCards.forEach((item) => {
  //Создание экземпляра карточки
  const card = new Card(item, '#card');
  // Создание карточки и возвращение наружу
  const cardElement = card.generateCard();
  // Добавление в DOM

  document.querySelector('.elements').append(cardElement);
});






// const popupOpenImage = document.querySelector('.popup_img');
// const popupImage = popupOpenImage.querySelector('.popup__image');
// const popupText = popupOpenImage.querySelector('.popup__text');
// const popupImageCloseButton = popupOpenImage.querySelector('.popup__close-icon');


// // Метод обработки событий (открытия попапа карточки)
// _handleOpenPopup() {
//   popupOpenImage.classList.add('popup_opened');
// }

// // Метод обработки событий (закрытия попапа карточки)
// _handleClosePopup() {
//   popupOpenImage.classList.remove('popup_opened');
// }

// // Метод добавляющий все обработчики
// _setEventListeners() {

//   popupImage.addEventListener('click', () => {
//     this._handleOpenPopup();
//   });

//   popupImageCloseButton.addEventListener('click', () => {
//     this._handleClosePopup();
//   });

//   popupLikeButton.addEventListener('click', () => {
//     this._handleClosePopup();
//   });

// }


