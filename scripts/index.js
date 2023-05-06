// Импорт класса Card
import { Card } from './Card.js';
// Импорт массива объектов
import { initialCards } from './constants.js';
// Импорт объекта настроек
import { settingsObject } from './constants.js';
// Импорт класса FormValidator
import { FormValidator } from './FormValidator.js';
// Импорт класса Section
import { Section } from './Section.js';
// Импорт класса PopupWithImage
import { PopupWithImage } from './PopupWithImage.js';
// Импорт класса PopupWithForm
import { PopupWithForm } from './PopupWithForm.js';
// Импорт класса UserInfo
import { UserInfo } from './UserInfo.js';
// Переменные открытия и закрытия попапа редактирования профиля
// Форма открывается нажатием на кнопку «edit» и закрывается кликом на 'X'
import { profileEditButton } from './constants.js';
import { profileName } from './constants.js';
import { profileInfo } from './constants.js';
import { popupFormEdit } from './constants.js';
import { nameInput } from './constants.js';
import { infoInput } from './constants.js';
import { cardElements } from './constants.js';
// Переменные формы добавления карточек
import { profileAddButton } from './constants.js';


// Создание экземпляров класса UserInfo
const userInfo = new UserInfo('.popup__field_text_name', '.popup__field_text_info');

// Создание экземпляров класса PopupWithForm
const popupEditProfileObj = new PopupWithForm('.popup_edit', (evt) => {
  const { name, info } = popupEditProfileObj._getInputValues();
  userInfo.setUserInfo(name, info);
},
  false
);
popupEditProfileObj.setEventListeners();

const popupAddCardObj = new PopupWithForm('.popup_add', handleFormCardSubmit, true);
popupAddCardObj.setEventListeners();

// Создание экземпляров класса PopupWithImage
const popupOpenImageObj = new PopupWithImage('.popup_img');
popupOpenImageObj.setEventListeners();


// Отрисовка каждого отдельного элемента
// Функция renderer
const cardList = new Section({
  initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
},
  '.cardElements');

//Функция добавления карточки
function createCard(item) {
  //Создание экземпляра карточки
  const card = new Card(item, '#card', popupOpenImageObj.open.bind(popupOpenImageObj));
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

// Функция закрытия попапа "добавления карточки"
// И добавление новой карточки после заполнения полей
export function handleFormCardSubmit(evt) {
  evt.preventDefault();

  const cardData = this._getInputValues();

  const cardElement = createCard(cardData);
  cardElements.prepend(cardElement);
  popupAddCardObj.close(popupAddCardObj);
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
  openPopupEdit(popupEditProfileObj, userInfo);
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


// Функция закрытия попапа "редактирование профиля"
// и сохранения имени и информации о себе
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  popupEditProfileObj.close(popupEditProfileObj);
}

// Сохранииение данных и закрытие попапа (кнопка "Сохранить")
popupFormEdit.addEventListener('submit', submitEditProfileForm);


// Функция открытия попапа "добавление карточки"
function openPopupAdd(popup) {
  popup.open(popup);
}

// Открытие и закрытие попапа "добавление карточки"
profileAddButton.addEventListener('click', function (evt) {
  openPopupAdd(popupAddCardObj);
});










