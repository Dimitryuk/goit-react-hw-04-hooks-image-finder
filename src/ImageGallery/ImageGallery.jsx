import fetchImages from '../Services/ImageFinderAPI';
import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from 'react-loader-spinner';

export default class ImageGallery extends Component {
  state = {
    currentPage: 1,
    searchQuery: '',
    baseURL: 'https://pixabay.com/api/',
    params: '&image_type=photo',
    APIKey: '23096925-d42719920a727f8342c46883c',
  };
}

{
  /* <ul className="ImageGallery">
  <!-- Набор <li> с изображениями -->
</ul> */
}
