export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод отвечающий за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  // Метод принимающий DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.append(element);
  }
}





