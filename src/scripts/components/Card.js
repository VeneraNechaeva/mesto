export class Card {
  constructor(data, templateSelector, handleCardClick, handleFormConfirmSubmit, api, userId) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleFormConfirmSubmit = handleFormConfirmSubmit;
    this._api = api;
    this._liked = data.likes.find((el) => el._id === userId) !== undefined;
    this._isMy = data.id === userId;
  }

  getData() {
    return this._data;
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
    let response;
    if (this._liked) {
      response = this._api.deletLike(this._data._id)
    }
    else {
      response = this._api.setLike(this._data._id)
    }

    response.then((data) => {
      evt.target.classList.toggle('element__icon-like_active');
      if (this._liked) {
        this._likesCount.textContent = this._data.likes.length;
      } else {
        this._likesCount.textContent = this._data.likes.length + 1;
      }

      this._liked = !this._liked
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  // Метод обработки событий (Удаление карточки)
  deleteCard() {
    this._element.remove();
  }

  // Метод добавляющий все обработчики
  _setEventListeners() {

    this._cardLikeButton.addEventListener('click', (evt) => {
      this._handleLikeCard(evt);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link)
    });

    this._cardDeleteButton.addEventListener('click', (evt) => {
      this._handleFormConfirmSubmit(evt, this);
    });
  }

  // Подготовка карточки к публикации
  generateCard() {
    this._element = this._getTemplate();
    this._cardLikeButton = this._element.querySelector('.element__icon-like');
    this._cardDeleteButton = this._element.querySelector('.element__delete-button');
    this._cardImage = this._element.querySelector('.element__image');
    this._likesCount = this._element.querySelector('.element__counter');
    this._setEventListeners();
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    this._likesCount.textContent = this._data.likes.length;
    this._element.querySelector('.element__text').textContent = this._data.name;

    if (this._liked) {
      this._cardLikeButton.classList.add('element__icon-like_active');
    }

    if (!this._isMy) {
      this._cardDeleteButton.remove();
    }

    return this._element;
  }
}



