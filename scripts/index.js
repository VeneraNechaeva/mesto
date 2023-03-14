// Открытие и закрытие попапа редактирования профиля
const popupElement = document.querySelector('.popup_edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-icon');

const profileElement = document.querySelector('.profile');
const popupOpenButtonElement = profileElement.querySelector('.profile__edit-button');

const profileNameElement = profileElement.querySelector('.profile__title');
const profileInfoElement = profileElement.querySelector('.profile__subtitle');

const formElement = popupElement.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__field_text_name');
let jobInput = formElement.querySelector('.popup__field_text_info');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileInfoElement.textContent;
};

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);


// Редактирование имени и информации о себе
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileNameElement.textContent = nameInput.value;
  profileInfoElement.textContent = jobInput.value;

  closePopup();
}

//1. Шесть карточек «из коробки»
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Добавляем 6 карточек, которые видны при загрузке страницы
function createCard(obj) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = obj.link;
  cardElement.querySelector('.element__text').textContent = obj.name;
  cardElement.querySelector('.element__image').alt = obj.name;

  likeElement(cardElement);
  deleteElement(cardElement);
  openImg(cardElement, obj);

  return cardElement;
}

initialCards.forEach(element => {
  let newCard = createCard(element);
  document.querySelector('.elements').append(newCard);
});


//2. Форма добавления карточки
//Форма открывается нажатием на кнопку «+» и закрывается кликом на крестик:
const popupAddElement = document.querySelector('.popup_add');
const popupAddCloseButtonElement = popupAddElement.querySelector('.popup__close-icon');
const formAddElement = popupAddElement.querySelector('.popup__form');

const profileAddElement = document.querySelector('.profile');
const popupAddOpenButtonElement = profileAddElement.querySelector('.profile__add-button');

const ItemElement = document.querySelector('.element');
const ElementImage = ItemElement.querySelector('.element__image');
const ElementText = ItemElement.querySelector('.element__text');

let placeInput = formAddElement.querySelector('.popup__field_text_name-place');
let linkInput = formAddElement.querySelector('.popup__field_text_link');

const openAddPopup = function () {
  popupAddElement.classList.add('popup_opened');

  placeInput.value = null;
  linkInput.value = null;
};

const closeAddPopup = function () {
  popupAddElement.classList.remove('popup_opened');
};

popupAddOpenButtonElement.addEventListener('click', openAddPopup);
popupAddCloseButtonElement.addEventListener('click', closeAddPopup);


//3. Добавление карточки по заполнению из формы
formAddElement.addEventListener('submit', handleFormCardSubmit);

function handleFormCardSubmit(evt) {
  evt.preventDefault();

  const obj = {
    name: placeInput.value,
    link: linkInput.value,
  }

  const createNewCard = createCard(obj);
  document.querySelector('.elements').prepend(createNewCard);
  closeAddPopup();
}

//4. Лайк карточки
function likeElement(elem) {
  elem.querySelector('.element__icon-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__icon-like_active');
  });
}

//5. Удаление карточки
function deleteElement(elem) {
  elem.querySelector('.element__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
}

//6. Открытие попапа с картинкой
//открывается нажатием на картинку и закрывается кликом на крестик:
const popupImgElement = document.querySelector('.popup_img');
const popupImgCloseButtonElement = popupImgElement.querySelector('.popup__close-icon');
const popupImg = popupImgElement.querySelector('.popup__image');
const popupText = popupImgElement.querySelector('.popup__text');

const openImgPopup = function (obj) {
  popupImgElement.classList.add('popup_opened');
  popupImg.src = obj.link;
  popupImg.alt = obj.name;
  popupText.textContent = obj.name;
};

const closeImgPopup = function () {
  popupImgElement.classList.remove('popup_opened');
};

popupImgCloseButtonElement.addEventListener('click', closeImgPopup);

function openImg(elem, obj) {
  elem.querySelector('.element__image').addEventListener('click', function (evt) {
    openImgPopup(obj);
  });
}



