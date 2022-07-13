import axios from 'axios';
import Notiflix from 'notiflix';

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '28591679-2423d3506d277a146306c6fa4';

  constructor() {
    this.query = null;
    this.page = 1;
    this.totalPages = 0;
    this.totalHits = 0;
  }

  async fetchPhotos() {
    const params = new URLSearchParams({
      key: this.#API_KEY,
      q: `${this.query}`,
      page: `${this.page}`,
      per_page: 40,
      imageType: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });
    try {
      const response = await axios.get(`${this.#BASE_URL}?${params}`);
      this.totalPages = Math.ceil(response.data.totalHits / 40);
      this.totalHits = response.data.totalHits;
      return response.data.hits;
    } catch (error) {
      Notiflix.Notify.warning('error');
    }
  }

  increasePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  setQuery(query) {
    this.query = query;
  }
  getTotalHits() {
    return this.totalHits;
  }
}
