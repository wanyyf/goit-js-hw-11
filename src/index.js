import { PixabayApi } from './js/fetchElementPhoto.js';
import './css/style.css';
import elementCreate from './hbs/elementCreate.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('#search-form');
const inputEl = formEl.querySelector("input[name='searchQuery']");
const boxGallaryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const gallerySimpleLightbox = new SimpleLightbox('.gallery a');

const pixabayFetch = new PixabayApi();

const fetchRenderEnd = async () => {
  const arrayPromis = await pixabayFetch.fetchPhotos();

  if (arrayPromis.length === 0) {
    loadMoreBtnEl.classList.add('hidedisplay');
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    boxGallaryEl.insertAdjacentHTML('beforeend', elementCreate(arrayPromis));
    gallerySimpleLightbox.refresh();
  }
};

const onFormSubmit = async e => {
  e.preventDefault();
  boxGallaryEl.innerHTML = '';
  pixabayFetch.resetPage();

  const { searchQuery } = e.currentTarget.elements;
  if (searchQuery.value.trim() === '') {
    Notiflix.Notify.warning(`Please! Enter the request for the desired image.`);
    loadMoreBtnEl.classList.add('hidedisplay');
    return;
  }
  pixabayFetch.setQuery(searchQuery.value.trim());
  await fetchRenderEnd();
  if (pixabayFetch.getTotalHits() === 0) {
    return;
  } else {
    Notiflix.Notify.success(
      `Hooray! We found ${pixabayFetch.getTotalHits()} images.`
    );
    loadMoreBtnEl.classList.remove('hidedisplay');
  }
};

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
  await pixabayFetch.increasePage();
  const arrayPromis = await pixabayFetch.fetchPhotos();
  if (arrayPromis.length < 40) {
    loadMoreBtnEl.classList.add('hidedisplay');
  }
  boxGallaryEl.insertAdjacentHTML('beforeend', elementCreate(arrayPromis));
  gallerySimpleLightbox.refresh();
}
