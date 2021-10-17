import axios from 'axios';

const currentPage = 1;
const searchQuery = '';
const baseURL = 'https://pixabay.com/api/';
const params = '&image_type=photo';
const APIKey = '23096925-d42719920a727f8342c46883c';

export default function fetchImages(
  searchQuery,
  baseURL,
  currentPage,
  params,
  APIKey,
) {
  return axios
    .get(
      `${baseURL}?key=${APIKey}&q=${searchQuery}&${params}&page=${currentPage}&per_page=12`,
    )
    .then(res => res.data.hits);
}
