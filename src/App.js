import { Component } from 'react';
import Searchbar from './SearchBar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Container from './Container/Container.jsx';

export default class App extends Component {
  state = {
    loading: false,
    inputValue: '',
  };

  handleFormSubmit = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery inputValue={this.state.inputValue} />
        </Container>
      </div>
    );
  }
}
