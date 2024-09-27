import icons from 'url:../../img/icons.svg';
import View from './View';

class list extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    return `${this._data
      .map(item => {
        return `<li class="preview">
            <a class="preview__link" href="#${item.id}">
              <figure class="preview__fig">
                <img src="${item.image}" alt="${item.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${item.title}</h4>
                <p class="preview__publisher">${item.publisher}</p>
              </div>
            </a>
          </li>`;
      })
      .join('')}`;
  }
}

export default new list();
