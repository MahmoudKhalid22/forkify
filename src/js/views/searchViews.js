class search {
  #parentElement = document.querySelector('.search');
  #data;
  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }
  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  searchHandlerRender(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler(this.getQuery());
    });
  }
}

export default new search();
