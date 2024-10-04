import View from './View';

class UploadRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _windowEl = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._handleOpenWindow();
    this._handleCloseWindow();
  }

  addHandlerRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  _handleToggleWindow() {
    this._windowEl.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _handleOpenWindow() {
    this._btnOpen.addEventListener(
      'click',
      this._handleToggleWindow.bind(this)
    );
  }
  _handleCloseWindow() {
    this._btnClose.addEventListener(
      'click',
      this._handleToggleWindow.bind(this)
    );

    this._overlay.addEventListener(
      'click',
      this._handleToggleWindow.bind(this)
    );
  }
}

export default new UploadRecipeView();
