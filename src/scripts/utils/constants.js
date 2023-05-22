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

