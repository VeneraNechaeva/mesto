// Импорт главного файла стилей
import './index.css';
// Импорт класса Card
import { Card } from '../scripts/components/Card.js';
// Импорт массива объектов
import { initialCards } from '../scripts/utils/constants.js';
// Импорт объекта настроек
import { settingsObject } from '../scripts/utils/constants.js';
// Импорт класса FormValidator
import { FormValidator } from '../scripts/components/FormValidator.js';
// Импорт класса Section
import { Section } from '../scripts/components/Section.js';
// Импорт класса PopupWithImage
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
// Импорт класса PopupWithForm
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
// Импорт класса UserInfo
import { UserInfo } from '../scripts/components/UserInfo.js';
// Переменные открытия и закрытия попапа редактирования профиля
// Форма открывается нажатием на кнопку «edit» и закрывается кликом на 'X'
import { profileEditButton } from '../scripts/utils/constants.js';
import { nameInput } from '../scripts/utils/constants.js';
import { infoInput } from '../scripts/utils/constants.js';
// Переменные формы добавления карточек
import { profileAddButton } from '../scripts/utils/constants.js';


// Создание экземпляров класса UserInfo
const userInfoPopup = new UserInfo('.popup__field_text_name', '.popup__field_text_info');
const userInfoProfile = new UserInfo('.profile__title', '.profile__subtitle');

// Создание экземпляров класса PopupWithForm
const popupEditProfile = new PopupWithForm('.popup_edit', (evt, data) => {
  const { name, info } = data;
  userInfoProfile.setUserInfo(name, info);
  popupEditProfile.close();
},
  false
);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_add', handleFormCardSubmit, true);
popupAddCard.setEventListeners();

// Создание экземпляров класса PopupWithImage
const popupOpenImage = new PopupWithImage('.popup_img');
popupOpenImage.setEventListeners();


// Публикация карточек
// Отрисовка каждого отдельного элемента
// Функция renderer
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
},
  '.elements');
cardList.renderItems();

//Функция добавления карточки
function createCard(item) {
  //Создание экземпляра карточки
  const card = new Card(item, '#card', popupOpenImage.open.bind(popupOpenImage));
  // Создание карточки и возвращение наружу
  const cardElement = card.generateCard();
  return cardElement;
}


// Функция закрытия попапа "добавления карточки"
// И добавление новой карточки после заполнения полей
export function handleFormCardSubmit(evt, data) {
  evt.preventDefault();

  const cardElement = createCard(data);
  cardList.addItem(cardElement);
  popupAddCard.close(popupAddCard);
}


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


// Слушатель открытия попапа редактирования профиля
// Открывается по кнопке редактирования
profileEditButton.addEventListener('click', function (evt) {
  openPopupEdit(popupEditProfile, userInfoProfile);
});

// Функция открытия попапа "редактирование профиля"
// Заполнение полей при каждом открытии
function openPopupEdit(popup, info) {
  const data = info.getUserInfo();
  nameInput.value = data.name;
  infoInput.value = data.info;
  popup.open();
  formValidators['edit-profile'].resetValidation();
}

// Функция открытия попапа "добавление карточки"
function openPopupAdd(popup) {
  popup.open(popup);
}

// Открытие и закрытие попапа "добавление карточки"
profileAddButton.addEventListener('click', function (evt) {
  openPopupAdd(popupAddCard);
});










