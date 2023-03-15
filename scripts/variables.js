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
