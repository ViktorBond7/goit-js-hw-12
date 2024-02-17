import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { hitsTemplate } from './renderImg';
import { fetchHits } from './newApi';

const refs = {
  searchFormRes: document.querySelector('.form'),
  imageGalleryRes: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('button[data-action="load-more"]'),
  loadElem: document.querySelector('.loader'),
};

const styleRef = new SimpleLightbox('.gallery a', {
  nav: true,
  captionDelay: 250,
  captionsData: 'alt',
  close: true,
  enableKeyboard: true,
  docClose: true,
});

// ======================================
let query;
let page;
let maxPage;
let per_page = 15;

refs.searchFormRes.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMoreClick);

// ======================================

async function onFormSubmit(e) {
  e.preventDefault();
  query = e.target.elements.query.value.trim();
  page = 1;

  if (!query) {
    showError('Empty field');
    return;
  }
  showLoader();
  try {
    const data = await fetchHits(query, page, per_page);
    if (data.totalHits === 0) {
      iziToast.error({
        position: 'topRight',
        width: '10px',
        message:
          'Sorry, there are no images matching your search query. Please try again',
      });
      return;
    }

    maxPage = Math.ceil(data.totalHits / per_page);

    refs.imageGalleryRes.innerHTML = '';
    renderHits(data.hits);
  } catch (err) {
    showError(err);
  }

  hideLoader();
  checkBtnVisibleStatus();
  e.target.reset();
}

async function onLoadMoreClick() {
  page += 1;
  showLoader();
  const data = await fetchHits(query, page, per_page);
  renderHits(data.hits);
  hideLoader();
  checkBtnVisibleStatus();

  const height =
    refs.imageGalleryRes.firstElementChild.getBoundingClientRect().height;

  scrollBy({
    behavior: 'smooth',
    top: height * 2,
  });
}

function renderHits(hits) {
  const markup = hitsTemplate(hits);
  refs.imageGalleryRes.insertAdjacentHTML('beforeend', markup);
  styleRef.refresh();
}

function showLoadBtn() {
  refs.btnLoadMore.classList.remove('hidden');
}
function hideLoadBtn() {
  refs.btnLoadMore.classList.add('hidden');
}

function showLoader() {
  refs.loadElem.classList.remove('hidden');
}
function hideLoader() {
  refs.loadElem.classList.add('hidden');
}

function showError(msg) {
  iziToast.error({
    title: 'Error',
    message: msg,
  });
}

function checkBtnVisibleStatus() {
  if (page >= maxPage) {
    hideLoadBtn();
    iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showLoadBtn();
  }
}
