//Шесть карточек «из коробки»
// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

//Объект настроек
export const settingsObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
};

// Переменные открытия и закрытия попапа редактирования профиля
// Форма открывается нажатием на кнопку «edit» и закрывается кликом на крестик
export const profile = document.querySelector('.profile');
export const profileEditButton = profile.querySelector('.profile__edit-button');
export const popupFormEdit = document.forms['edit-profile'];
export const nameInput = popupFormEdit.querySelector('.popup__field_text_name');
export const infoInput = popupFormEdit.querySelector('.popup__field_text_info');
export const cardElements = document.querySelector('.elements');
// Переменные формы добавления карточек
// Форма открывается нажатием на кнопку «+» и закрывается кликом на крестик
export const profileAddButton = profile.querySelector('.profile__add-button');
// // Переменные попапа "Обновить аватар"
export const avatarButton = document.querySelector('.profile__avatar-button');
export const avatarImg = document.querySelector('.profile__avatar');
// Переменные попапа "Удалить карточку"
export const deleteCardButton = document.querySelector('.element__delete-button');
