import { data } from '../model';
import icons from 'url:../../img/icons.svg';

import View from './View';

class Pagination extends View {
  _parentElement = document.querySelector('.pagination');

  handleRender(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goto = +btn.dataset.goto;
      console.log(btn.dataset);
      console.log(goto);

      handler(goto);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      data.search.result.length / +data.search.resultsPerPage
    );
    const curPage = data.search.currentPage;

    // first page with no anohter pages
    if (curPage === 1 && curPage === numPages) {
      return '';
    }
    // last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }
    // first page with other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }

    // other pages prev and next
    if (curPage > 1 && curPage < numPages) {
      const prevButton = this._generateMarkupButton('prev', curPage);
      const nextButton = this._generateMarkupButton('next', curPage);
      return `${prevButton} ${nextButton}`;
    }
  }
  _generateMarkupButton(btn, page = data.search.currentPage) {
    return btn === 'prev'
      ? `<button data-goTo=${
          page - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
          </button>`
      : `<button data-goTo=${
          page + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
}

export default new Pagination();
