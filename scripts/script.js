// Открытие и закрытие попапа
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-icon');

const profilelement = document.querySelector('.profile');
const popupOpenButtonElement = profilelement.querySelector('.profile__edit-button');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
};

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);


// Редактирование имени и информации о себе

const formElement = document.querySelector('.popup');
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector('.popup__text-name');
  let jobInput = formElement.querySelector('.popup__text-info');

  const profileElement = document.querySelector('.profile');
  const profileNameElement = profileElement.querySelector('.profile__title');
  const profileInfoElement = profileElement.querySelector('.profile__subtitle');

  profileNameElement.textContent = nameInput.value;
  profileInfoElement.textContent = jobInput.value;

  closePopup();
}

