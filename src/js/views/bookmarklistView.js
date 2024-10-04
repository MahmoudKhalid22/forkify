import View from './View';
import icons from 'url:../../img/icons.svg';

class Bookmark extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  handleRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `${this._data
      ?.map(item => {
        return `<li class="preview">
          <a class="preview__link ${
            id === item.id ? 'preview__link--active' : ''
          }" href="#${item.id}">
            <figure class="preview__fig">
              <img src="${item.image_url}" alt="${item.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${item.title}</h4>
              <p class="preview__publisher">${item.publisher}</p>
              <div class="recipe__user-generated  ${item.key ? '' : 'hidden'}">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                 
        </div>
            </div>
          </a>
        </li>`;
      })
      .join('')}`;
  }
}

export default new Bookmark();
