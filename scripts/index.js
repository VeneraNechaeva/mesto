// Функции открытия и закрытия попапа редактирования профиля
const openPopup = function () {
  popupEditProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
};

const closePopup = function () {
  popupEditProfile.classList.remove('popup_opened');
};

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);


// Функция редактирования имени и информации о себе
popupFormEdit.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;

  closePopup();
}


// Добавление 6 карточек, которые видны при загрузке страницы
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const imageElement = cardElement.querySelector('.element__image');

  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  cardElement.querySelector('.element__text').textContent = cardData.name;

  likeElement(cardElement);
  deleteElement(cardElement);
  openImg(cardElement, cardData);

  return cardElement;
}

initialCards.forEach(element => {
  const newCard = createCard(element);
  cardElements.append(newCard);
});


// Функция формы добавления карточки
// Форма открывается нажатием на кнопку «+» и закрывается кликом на крестик:
const openAddPopup = function () {
  popupAddCard.classList.add('popup_opened');
  popupFormAdd.reset();
};

const closeAddPopup = function () {
  popupAddCard.classList.remove('popup_opened');
};

profileAddButton.addEventListener('click', openAddPopup);
popupAddCloseButton.addEventListener('click', closeAddPopup);


// Функция добавления карточки по заполнению из формы
popupFormAdd.addEventListener('submit', handleFormCardSubmit);

function handleFormCardSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: placeInput.value,
    link: linkInput.value,
  }

  const createNewCard = createCard(cardData);
  cardElements.prepend(createNewCard);
  closeAddPopup();
}

// Лайк карточки
function likeElement(elem) {
  elem.querySelector('.element__icon-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__icon-like_active');
  });
}

// Удаление карточки
function deleteElement(elem) {
  elem.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
}

// Открытие попапа с картинкой
// Открывается нажатием на картинку и закрывается кликом на крестик
const openImgPopup = function (cardData) {
  popupOpenImage.classList.add('popup_opened');
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupText.textContent = cardData.name;
};

const closeImgPopup = function () {
  popupOpenImage.classList.remove('popup_opened');
};

popupImageCloseButton.addEventListener('click', closeImgPopup);

function openImg(elem, cardData) {
  elem.querySelector('.element__image').addEventListener('click', function (evt) {
    openImgPopup(cardData);
  });
}



