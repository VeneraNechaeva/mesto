// Открытие и закрытие попапа
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-icon');

const profilelement = document.querySelector('.profile');
const popupOpenButtonElement = profilelement.querySelector('.profile__edit-button');

const profileNameElement = profilelement.querySelector('.profile__title');
const profileInfoElement = profilelement.querySelector('.profile__subtitle');

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

