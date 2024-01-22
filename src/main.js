import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const searchFormRes = document.querySelector('.form');
const imageGalleryRes = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtnRes = document.querySelector(
  'button[data-action="load-more"]'
);
const searchInput = document.querySelector('.search-input');

loader.style.display = 'none';

let currentPage = 1;
const perPage = 3;
let searchQuery = '';

const styleRef = new SimpleLightbox('.gallery a', {
  nav: true,
  captionDelay: 250,
  captionsData: 'alt',
  close: true,
  enableKeyboard: true,
  docClose: true,
});

async function fetchImg(query) {
  searchQuery = query;
  const searchParams = {
    key: '41712066-bd7b5e249df7a86bd45ef70ea',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: perPage,
  };
  const params = new URLSearchParams(searchParams);
  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
  } catch (error) {
    console.error(error);
    iziToast.error({
      position: 'topRight',
      width: '10px',
      message:
        'Sorry, there are no images matching your search query. Please try again',
    });
  } finally {
    loader.style.display = 'none';
  }
}

function rendersImg(data) {
  if (data.hits.length > 0) {
    const imgs = data.hits.reduce(
      (
        html,
        { webformatURL, largeImageURL, tags, likes, views, comments, downloads }
      ) =>
        html +
        `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
           <img class="gallery-image"
           src="${webformatURL}"
           alt="${tags}"
           />
          </a>
          <div class="description">
          <p><b>Likes</b>${likes}</p>
          <p><b>Views</b>${views}</p>
          <p><b>Comments</b>${comments}</p>
          <p><b>Downloads</b>${downloads}</p>
          </div>
        </li>`,
      ''
    );
    imageGalleryRes.insertAdjacentHTML('beforeend', imgs);
    styleRef.refresh();
  } else {
    loadMoreBtnRes.style.display = 'none';
    iziToast.error({
      position: 'topRight',
      width: '10px',
      message:
        'Sorry, there are no images matching your search query. Please try again',
    });
  }
}

searchFormRes.addEventListener('submit', async e => {
  e.preventDefault();
  loadMoreBtnRes.style.display = 'none';
  imageGalleryRes.innerHTML = '';
  loader.style.display = 'block';
  currentPage = 1;

  const query = searchInput.value.trim();
  const fetchImgs = await fetchImg(query, currentPage);
  rendersImg(fetchImgs);
  if (fetchImgs > 0) {
    loadMoreBtnRes.style.display = 'block';
  }
  e.target.reset();
});

const scrollToNextGroup = () => {
  const firstGalleryItem = document.querySelector('.gallery-item:first-child');
  const galleryItemHeight = firstGalleryItem.getBoundingClientRect().height;
  window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
};

loadMoreBtnRes.addEventListener('click', async () => {
  loadMoreBtnRes.style.display = 'none';
  const { totalHits } = await fetchImg(searchQuery, currentPage, perPage);

  loader.style.display = 'block';
  if (currentPage * perPage >= totalHits) {
    iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    currentPage += 1;
    const fetcImgRen = await fetchImg(searchQuery, currentPage);
    rendersImg(fetcImgRen);
    loadMoreBtnRes.style.display = 'block';
    scrollToNextGroup();
  }
});
