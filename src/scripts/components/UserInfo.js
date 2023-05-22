export class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._infoSelector = document.querySelector(infoSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  // Возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      info: this._infoSelector.textContent,
    }
  }

  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(name, info) {
    this._nameSelector.textContent = name;
    this._infoSelector.textContent = info;
  }

  setUserAvatar(avatar) {
    this._avatarSelector.src = avatar;
  }
}
