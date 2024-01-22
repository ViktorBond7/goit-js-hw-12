import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const formRes = document.querySelector('.form');
const galleryRes = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtnRes = document.querySelector(
  'button[data-action="load-more"]'
);
const searchInput = document.querySelector('.search-input');

loader.style.display = 'none';

loadMoreBtnRes.style.display = 'none';

let pageA = 1;
let perPage = 3;
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
    page: pageA,
    per_page: perPage,
  };
  const params = new URLSearchParams(searchParams);
  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
  } catch (error) {
    console.error(error);
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
    galleryRes.insertAdjacentHTML('beforeend', imgs);
    styleRef.refresh();
    loadMoreBtnRes.style.display = 'block';
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

formRes.addEventListener('submit', async e => {
  e.preventDefault();

  galleryRes.innerHTML = '';
  loader.style.display = 'block';
  pageA = 1;

  const query = searchInput.value.trim();
  const fetchImgs = await fetchImg(query, pageA);
  rendersImg(fetchImgs);
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
  const { totalHits } = await fetchImg(searchQuery, pageA, perPage);

  if (pageA * perPage >= totalHits) {
    iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
    loadMoreBtnRes.style.display = 'none';
  } else {
    loadMoreBtnRes.style.display = 'flex';
    pageA += 1;
    const fetcImgRen = await fetchImg(searchQuery, pageA);
    rendersImg(fetcImgRen);
    scrollToNextGroup();
  }
});
