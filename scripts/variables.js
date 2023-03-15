// Переменные открытия и закрытия попапа редактирования профиля
// Форма открывается нажатием на кнопку «edit» и закрывается кликом на крестик
const popupElement = document.querySelector('.popup_edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-icon');

const profileElement = document.querySelector('.profile');
const popupOpenButtonElement = profileElement.querySelector('.profile__edit-button');

const profileNameElement = profileElement.querySelector('.profile__title');
const profileInfoElement = profileElement.querySelector('.profile__subtitle');

const formElement = popupElement.querySelector('.popup__form');

const nameInput = formElement.querySelector('.popup__field_text_name');
const jobInput = formElement.querySelector('.popup__field_text_info');

const cardTemplate = document.querySelector('#card').content;
const cardElements = document.querySelector('.elements');
// Переменные формы добавления карточек
// Форма открывается нажатием на кнопку «+» и закрывается кликом на крестик
const popupAddElement = document.querySelector('.popup_add');
const popupAddCloseButtonElement = popupAddElement.querySelector('.popup__close-icon');
const formAddElement = popupAddElement.querySelector('.popup__form');

const profileAddElement = document.querySelector('.profile');
const popupAddOpenButtonElement = profileAddElement.querySelector('.profile__add-button');

const placeInput = formAddElement.querySelector('.popup__field_text_name-place');
const linkInput = formAddElement.querySelector('.popup__field_text_link');
// Переменные открытия попапа с картинкой
// Открывается нажатием на картинку и закрывается кликом на крестик:
const popupImgElement = document.querySelector('.popup_img');
const popupImgCloseButtonElement = popupImgElement.querySelector('.popup__close-icon');
const popupImg = popupImgElement.querySelector('.popup__image');
const popupText = popupImgElement.querySelector('.popup__text');
