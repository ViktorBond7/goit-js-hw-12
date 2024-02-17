import axios from 'axios';

export async function fetchHits(query, currentPage, per_page) {
  const API_KEY = '41712066-bd7b5e249df7a86bd45ef70ea';
  const BASE_URL = 'https://pixabay.com/api/';

  const url = `${BASE_URL}`;

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: per_page,
    page: currentPage,
  };

  const res = await axios.get(BASE_URL, { params });
  return res.data;
}
