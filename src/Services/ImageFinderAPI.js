import axios from 'axios';

export function fetchPictures(inputValue, baseApi, myApiKey, page) {
  return axios
    .get(
      `${baseApi}?q=${inputValue}&page=${page}&key=${myApiKey}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(r => r.data.hits);
}
