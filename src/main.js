import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRes = document.querySelector('.form');
const galleryRes = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
loader.style.display = 'none';

const searchParams = {
  key: '41712066-bd7b5e249df7a86bd45ef70ea',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

const styleRef = new SimpleLightbox('.gallery a', {
  nav: true,
  captionDelay: 250,
  captionsData: 'alt',
  close: true,
  enableKeyboard: true,
  docClose: true,
});

function fetchUsers(params) {
  return fetch(`https://pixabay.com/api/?${params}`).then(response => {
    if (!response.ok) {
      throw new Error('Request is not ok');
    }
    return response.json();
  });
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
    galleryRes.innerHTML = imgs;
    styleRef.refresh();
  } else {
    galleryRes.innerHTML = '';
    iziToast.error({
      position: 'topRight',
      width: '10px',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
  }
}

formRes.addEventListener('submit', e => {
  e.preventDefault();
  galleryRes.innerHTML = '';
  loader.style.display = 'block';
  searchParams.q = formRes.search.value.trim();
  const param = new URLSearchParams(searchParams);

  fetchUsers(param)
    .then(data => rendersImg(data))
    .catch(error => console.log(error.message))
    .finally(() => {
      loader.style.display = 'none';
    });
  e.currentTarget.reset();
});
