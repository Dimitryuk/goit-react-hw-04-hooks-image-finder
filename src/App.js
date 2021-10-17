import './App.css';
import ImageGallery from './ImageGallery/ImageGallery';
import React, { PureComponent } from 'react';
import Container from './Container/Container';
import fetchImages from './Services/ImageFinderAPI';
import SearchBar from './SearchBar/SearchBar';

export default class App extends React.Component {
  state = {
    hits: null,
    inputValue: '',
  };
  handleFormSubmit = inputValue => {
    console.log(inputValue);
    if (this.state.inputValue.trim() === '') {
      alert('введите запрос');
      return;
    }
    this.setState({ inputValue });
  };
  componentDidMount() {
    fetch(
      'https://pixabay.com/api/?key=23096925-d42719920a727f8342c46883c&q=yellow+flowers&image_type=photo',
    )
      .then(res => res.json)
      .then(hits => this.setState({ hits }));
  }
  //other logic
  render() {
    return (
      <Container>
        {this.state.hits && <div>Тут будет отрисовка </div>}
        <SearchBar onSubmit={this.handleFormSubmit} />
      </Container>
    );
  }
}
