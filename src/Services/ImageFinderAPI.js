import axios from 'axios';

const myApiKey = '23096925-d42719920a727f8342c46883c';
const baseApi = 'https://pixabay.com/api/';
export function fetchPictures(inputValue, page) {
  return axios
    .get(
      `${baseApi}?q=${inputValue}&page=${page}&key=${myApiKey}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(r => r.data.hits);
}
