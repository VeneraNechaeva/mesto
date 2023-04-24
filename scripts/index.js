// Импорт класса Card
import { Card } from './Card.js';
// Импорт массива объектов
import { initialCards } from './constants.js';
// Импорт объекта настроек
import { settingsObject } from './constants.js';
// Импорт класса FormValidator
import { FormValidator } from './FormValidator.js';
// Переменные открытия и закрытия попапа редактирования профиля
// Форма открывается нажатием на кнопку «edit» и закрывается кликом на 'X'
import { popupEditProfile } from './constants.js';
import { profileEditButton } from './constants.js';
import { profileName } from './constants.js';
import { profileInfo } from './constants.js';
import { popupFormEdit } from './constants.js';
import { nameInput } from './constants.js';
import { infoInput } from './constants.js';
import { cardElements } from './constants.js';
// Переменные формы добавления карточек
// Форма открывается нажатием на кнопку «+» и закрывается кликом на 'X'
import { popupAddCard } from './constants.js';
import { popupFormAdd } from './constants.js';
import { profileAddButton } from './constants.js';
import { placeInput } from './constants.js';
import { linkInput } from './constants.js';
// Переменные открытия попапа с картинкой
// Открывается нажатием на картинку и закрывается кликом на крестик:
import { popupOpenImage } from './constants.js';
import { popupImage } from './constants.js';
import { popupText } from './constants.js';


// ФУНКЦИИ
// Функция открытия попапа (общая)
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

// Функция закрытия попапа (общая)
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

// Функция закрытия попапов кликом на оверлей или на "х"
const closePopupByOverlay = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach(popup => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-icon')) {
        closePopup(popup)
      }
    });
  });
};

closePopupByOverlay();


// Функция закрытия попапа нажатием на Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup !== null) {
      closePopup(activePopup)
    };
  };
};

// Функция открытия попапа "редактирование профиля"
// Заполнение полей при каждом открытии
function openPopupEdit(popup) {
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
  openPopup(popup);
  formValidators['edit-profile'].resetValidation();
}

// Функция закрытия попапа "редактирование профиля"
// и сохранения имени и информации о себе
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupEditProfile);
}

// Функция открытия попапа "добавление карточки"
function openPopupAdd(popup) {
  openPopup(popup);
}

//Функция добавления карточки
function createCard(item) {
  //Создание экземпляра карточки
  const card = new Card(item, '#card', handleCardClick);
  // Создание карточки и возвращение наружу
  const cardElement = card.generateCard();
  return cardElement;
}

// Публикация карточек
initialCards.forEach((item) => {
  const cardElement = createCard(item);
  // Добавление в DOM
  cardElements.append(cardElement);
});


// Функция открытия попапа с картинкой
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupText.textContent = name;
  openPopup(popupOpenImage);
}

// Функция закрытия попапа "добавления карточки"
// И добавление новой карточки после заполнения полей
function handleFormCardSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: placeInput.value,
    link: linkInput.value,
  }

  popupFormAdd.reset();

  const cardElement = createCard(cardData);
  cardElements.prepend(cardElement);
  closePopup(popupAddCard);
}

// УСТАНОВКА СЛУШАТЕЛЕЙ
// Открытие попапа редактирования профиля
// Открывается по кнопке редактирования
profileEditButton.addEventListener('click', function (evt) {
  openPopupEdit(popupEditProfile);
});

// Сохранииение данных и закрытие попапа (кнопка "Сохранить")
popupFormEdit.addEventListener('submit', submitEditProfileForm);


// Открытие и закрытие попапа "добавление карточки"
profileAddButton.addEventListener('click', function (evt) {
  openPopupAdd(popupAddCard);
});

// Сохранение данных, добавление карточки, закрытие попапа (кнопка "Создать")
popupFormAdd.addEventListener('submit', handleFormCardSubmit);


// Создание экземпляров валидаторов всех форм
const formValidators = {}
// Включение валидации
const enableValidation = (settingsObject) => {
  const formList = Array.from(document.querySelectorAll(settingsObject.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(settingsObject, formElement)
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settingsObject);
