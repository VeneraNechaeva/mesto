// Импорт главного файла стилей
import './index.css';
// Импорт класса Card
import { Card } from '../scripts/components/Card.js';
// Импорт массива объектов
// import { initialCards } from '../scripts/utils/constants.js';
// Импорт объекта настроек
import { settingsObject } from '../scripts/utils/constants.js';
// Импорт класса FormValidator
import { FormValidator } from '../scripts/components/FormValidator.js';
// Импорт класса Section
import { Section } from '../scripts/components/Section.js';
// Импорт класса Api
import { Api } from '../scripts/components/Api.js';
// Импорт класса PopupWithImage
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
// Импорт класса PopupWithForm
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
// Импорт класса PopupWithConfirmation
import { PopupWithConfirmation } from '../scripts/components/PopupWithConfirmation.js';
// Импорт класса UserInfo
import { UserInfo } from '../scripts/components/UserInfo.js';
// Переменные открытия и закрытия попапа редактирования профиля
// Форма открывается нажатием на кнопку «edit» и закрывается кликом на 'X'
import { profileEditButton } from '../scripts/utils/constants.js';
import { nameInput } from '../scripts/utils/constants.js';
import { infoInput } from '../scripts/utils/constants.js';
// Переменные формы добавления карточек
import { profileAddButton } from '../scripts/utils/constants.js';
// Переменные попапа "Обновить аватар"
import { avatarButton } from '../scripts/utils/constants.js';
import { avatarImg } from '../scripts/utils/constants.js';
import { deleteCardButton } from '../scripts/utils/constants.js';


// Создание экземпляров класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'e9c671c4-c4d8-4942-9020-977fdfc1a3d7',
    'Content-Type': 'application/json'
  }
});

// .catch((err) => {
//   console.log(err); // выведем ошибку в консоль
// });

// .then((data) => {
//   console.log(data);
// });

// Создание экземпляров класса UserInfo
const userInfoProfile = new UserInfo('.profile__title', '.profile__subtitle');


let cardList;
api.getUserInformation().then((userData) => {
  userInfoProfile.setUserInfo(userData.name, userData.about)

  // Публикация карточек
  // Отрисовка каждого отдельного элемента
  // Функция renderer
  api.getInitialCards()
    .then((data) => {
      cardList = new Section({
        items: data,
        renderer: (item) => {
          const cardElement = createCard(item, userData._id);
          cardList.addItem(cardElement);
        }
      },
        '.elements');
      cardList.renderItems();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
})
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


// Создание экземпляров класса PopupWithForm для попапа "Редактирования профиля"
const popupEditProfile = new PopupWithForm('.popup_edit', (evt, data) => {
  const { name, info } = data;
  api.savetUserInformation(name, info)
    .then((data) => {
      userInfoProfile.setUserInfo(name, info);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });

  popupEditProfile.close();
},
  false
);
popupEditProfile.setEventListeners();

// Создание экземпляров класса PopupWithForm для попапа "Добавления карточки"
const popupAddCard = new PopupWithForm('.popup_add', handleFormCardSubmit, true);
popupAddCard.setEventListeners();

// Создание экземпляров класса PopupWithImage
const popupOpenImage = new PopupWithImage('.popup_img');
popupOpenImage.setEventListeners();

// Создание экземпляров класса PopupWithForm для попапа "Обновить аватар"
const popupAvatar = new PopupWithForm('.popup_avatar', handleFormAvatarSubmit, true);
popupAvatar.setEventListeners();

// Создание экземпляров класса PopupWithConfirmation для попапа "Удалить карточку"
const popupConfirm = new PopupWithConfirmation('.popup_confirm', handleFormConfirmSubmit, true);
popupConfirm.setEventListeners();

// Функция закрытия попапа "Удаление карточки"
function handleFormConfirmSubmit(evt, card) {
  evt.preventDefault();

  api.deletСard(card.getData()._id)
    .then((data) => {
      popupConfirm.close();
      card.deleteCard();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

//Функция добавления карточки
function createCard(item, userId) {
  //Создание экземпляра карточки
  const card = new Card(item, '#card', popupOpenImage.open.bind(popupOpenImage),
    popupConfirm.open.bind(popupConfirm), api, userId,
  );
  // Создание карточки и возвращение наружу
  const cardElement = card.generateCard();
  return cardElement;
}


// Функция закрытия попапа "добавления карточки"
// И добавление новой карточки после заполнения полей
export function handleFormCardSubmit(evt, data) {
  evt.preventDefault();

  api.addNewCard(data.name, data.link)
    .then((data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement);
      popupAddCard.close(popupAddCard);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
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

// Слушатель открытия попапа "добавление карточки"
profileAddButton.addEventListener('click', function (evt) {
  openPopupAdd(popupAddCard);
});

// Функция закрытия попапа "Обновить аватар"
// И добновление нового изображения на аватарку после заполнения полей
export function handleFormAvatarSubmit(evt, data) {
  evt.preventDefault();

  avatarImg.src = data.avatar;
  popupAvatar.close(popupAvatar);
}

// Слушатель открытия попапа "Обновить аватар"
avatarButton.addEventListener('click', function (evt) {
  openPopupAvatar(popupAvatar);
});

// Функция открытия попапа "Обновить аватар"
function openPopupAvatar(popup) {
  popup.open(popup);
}

///////////////////////////////////////////////////////////////////////////////////



// // Слушатель открытия попапа "Удаление карточки"
// deleteCardButton.addEventListener('click', function (evt) {
//   openPopupConfirmDeletCard(popupConfirm);
// });



// // Функция открытия попапа "Удаление карточки"
// function openPopupConfirmDeletCard(popup) {
//   popup.open(popup);
// }


////////////////////////////////////////////////////////////////////////////
// function renderLoading(isLoading) {
//   if (isLoading) {
//     spinner.classList.add('spinner_visible');
//     content.classList.add('content_hidden');
//   } else {
//     spinner.classList.remove('spinner_visible');
//     content.classList.remove('content_hidden');
//   }
// }
