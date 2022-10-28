import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }
    // Page 1, and there are no other pages
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }
    // Other page
    if (curPage < numPages) {
      return this._generateMarkupButton('prev', curPage).concat(
        this._generateMarkupButton('next', curPage)
      );
    }
    // Page 1, and there are other pages
    return '';
  }

  _generateMarkupButton(btnType, curPage) {
    const num = btnType === 'prev' ? curPage - 1 : curPage + 1;
    if (btnType === 'prev') {
      return `
    <button data-goto="${num}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${num}</span>
    </button>
    `;
    }
    if (btnType === 'next') {
      return `
    <button data-goto="${num}" class="btn--inline pagination__btn--next">
        <span>Page ${num}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;
    }
  }
}

export default new PaginationView();
