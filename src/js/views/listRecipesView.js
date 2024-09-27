import icons from 'url:../../img/icons.svg';

class list {
  #parentElement = document.querySelector('.results');
  #data;

  renderRecipe(data) {
    this.#data = data;
    this.#clear();
    this.#recipeList();
  }
  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #recipeList() {
    const markup = `${this.#data.map(item => {
      return `<li class="preview">
            <a class="preview__link preview__link--active" href="#${item.id}">
              <figure class="preview__fig">
                <img src="${item.image}" alt="${item.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${item.title}</h4>
                <p class="preview__publisher">${item.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
    })}`;
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new list();
