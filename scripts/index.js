// ПЕРЕМЕННЫЕ
// Переменные открытия и закрытия попапа редактирования профиля
// Форма открывается нажатием на кнопку «edit» и закрывается кликом на крестик
const popupEditProfile = document.querySelector('.popup_edit');
const popupCloseButton = popupEditProfile.querySelector('.popup__close-icon');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');

const profileName = profile.querySelector('.profile__title');
const profileInfo = profile.querySelector('.profile__subtitle');

const popupFormEdit = popupEditProfile.querySelector('.popup__form');

const nameInput = popupFormEdit.querySelector('.popup__field_text_name');
const infoInput = popupFormEdit.querySelector('.popup__field_text_info');

const cardTemplate = document.querySelector('#card').content;
const cardElements = document.querySelector('.elements');
// Переменные формы добавления карточек
// Форма открывается нажатием на кнопку «+» и закрывается кликом на крестик
const popupAddCard = document.querySelector('.popup_add');
const popupAddCloseButton = popupAddCard.querySelector('.popup__close-icon');
const popupFormAdd = popupAddCard.querySelector('.popup__form');

const profileAddButton = profile.querySelector('.profile__add-button');

const placeInput = popupFormAdd.querySelector('.popup__field_text_name-place');
const linkInput = popupFormAdd.querySelector('.popup__field_text_link');
// Переменные открытия попапа с картинкой
// Открывается нажатием на картинку и закрывается кликом на крестик:
const popupOpenImage = document.querySelector('.popup_img');
const popupImageCloseButton = popupOpenImage.querySelector('.popup__close-icon');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupText = popupOpenImage.querySelector('.popup__text');


// ФУНКЦИИ
// Функция добавления карточки
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
//Функция добавление 6 карточек, которые видны при загрузке страницы
initialCards.forEach(element => {
  const newCard = createCard(element);
  cardElements.append(newCard);
});

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

// Функция открытия попапа (общая)
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа (общая)
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Функция открытия попапа "редактирование профиля"
// Заполнение полей при каждом открытии
function openPopupEdit(popup) {
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
  openPopup(popup);
}

// Функция закрытия попапа "редактирование профиля"
// и сохранения имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupEditProfile);
}

// Функция открытия попапа "добавление карточки"
function openPopupAdd(popup) {
  popupFormAdd.reset();
  openPopup(popup);
}

// Функция закрытия попапа "добавления карточки"
// И добавление новой карточки после заполнения полей
function handleFormCardSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: placeInput.value,
    link: linkInput.value,
  }

  const createNewCard = createCard(cardData);
  cardElements.prepend(createNewCard);
  closePopup(popupAddCard);
}

// Функция открытия попапа с картинкой
// Передаются данные из карточки
function openPopupImg(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupText.textContent = cardData.name;
  openPopup(popupOpenImage);
};


// УСТАНОВКА СЛУШАТЕЛЕЙ
// Открытие и закрытие попапа редактирования профиля
// Открывается по кнопке редактирования и закрывается на «x»
profileEditButton.addEventListener('click', function (evt) {
  openPopupEdit(popupEditProfile);
});
popupCloseButton.addEventListener('click', function (evt) {
  closePopup(popupEditProfile);
});
// Сохранииение данных и закрытие попапа (кнопка "Сохранить")
popupFormEdit.addEventListener('submit', handleFormSubmit);


// Открытие и закрытие попапа "добавление карточки"
// Открывается на кнопку «+» и закрывается кликом на «x»
profileAddButton.addEventListener('click', function (evt) {
  openPopupAdd(popupAddCard);
});
popupAddCloseButton.addEventListener('click', function (evt) {
  closePopup(popupAddCard);
});
// Сохранение данных, добавление карточки, закрытие попапа (кнопка "Создать")
popupFormAdd.addEventListener('submit', handleFormCardSubmit);


// Установка слушателя открытия попапа с картинкой
// Открывается кликом на кртинку в карточке
function openImg(elem, cardData) {
  elem.querySelector('.element__image').addEventListener('click', function (evt) {
    openPopupImg(cardData);
  });
}
// Закрытие попапа с картинкой кликом на «x»
popupImageCloseButton.addEventListener('click', function (evt) {
  closePopup(popupOpenImage);
});
