import { PixabayApi } from './js/fetchElementPhoto.js';
import elementCreate from './hbs/elementCreate.hbs';

const formEl = document.querySelector('#search-form');
const inputEl = formEl.querySelector("input[name='searchQuery']");
const boxGallaryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onSubmitBtn);

async function onSubmitBtn(evt) {
  evt.preventDefault();
  const inputValue = inputEl.value;
  console.log(inputValue);
  const getPhotos = await PixabayApi.fetchPhotos();
  const textRender = await elementCreate(getPhotos);
  boxGallaryEl.innerHTML = textRender;
}
