export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
    return {
      nameInput: this._nameSelector.textContent,
      infoInput: this._infoSelector.textContent,
    }
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(name, info) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = info;
  }
}
