// Импорт класса Card
import { Card } from './Card.js';
// Импорт массива объектов
import { initialCards } from './constants.js';
// Импорт объекта настроек
import { settingsObject } from './constants.js';
// Импорт класса FormValidator
import { FormValidator } from './FormValidator.js';


// Публикация карточек
initialCards.forEach((item) => {
  //Создание экземпляра карточки
  const card = new Card(item, '#card');
  // Создание карточки и возвращение наружу
  const cardElement = card.generateCard();
  // Добавление в DOM
  document.querySelector('.elements').append(cardElement);
});

// Создание экземпляра класса для каждой проверяемой формы
const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));
formList.forEach(formElement => {
  const validator = new FormValidator(settingsObject, formElement);
  validator.enableValidation();
})
