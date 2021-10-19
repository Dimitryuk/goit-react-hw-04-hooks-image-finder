import { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPictures } from '../Services/ImageFinderAPI';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader.jsx';
import Modal from '../ModalWindow/ModalWindow';
import scrollToBottom from '../scroll/scroll'

export default class ImageGallery extends Component {
  state = {
    baseApi: 'https://pixabay.com/api/',
    myApiKey: '22969021-19f1494240440c9eacf690dfa',
    page: 1,
    pictures: [],
    error: null,
    largeUrl: '',
    showModal: false,
    status: 'idle',
  };

 
componentDidUpdate(prevProps, prevState) {
    const { baseApi, myApiKey, page,  } = this.state;
    const prevInputValue = prevProps.inputValue;
    const nextInputValue = this.props.inputValue;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevInputValue !== nextInputValue) {
      this.setState({ status: "pending" });
      this.setState({ pictures: [] });

      fetchPictures(nextInputValue, baseApi, myApiKey, page)
        .then((pictures) => {
          if (pictures.length === 0) {
            return this.setState({ status: "rejected" });
          }
          this.getPictures(pictures);
        })
        .then(this.setState({ status: "resolved" }))
        .catch((error) => this.setState({ error, status: "rejected" }));
    } else if (prevPage !== nextPage) {
      this.setState({ status: "pending" });

      fetchPictures(nextInputValue, baseApi, myApiKey, page)
        .then((pictures) => this.getPictures(pictures))
        .then(this.setState({ status: "resolved" })).then(()=>{scrollToBottom()})
        
        .catch((error) => this.setState({ error, status: "rejected" }));
  }
  
  }
  getPictures = array => {
    const newArr = array.map(picture => {
      return {
        id: picture.id,
        webformatURL: picture.webformatURL,
        largeImageURL: picture.largeImageURL,
      };
    });

    this.setState({
      pictures: [...this.state.pictures,...newArr],
    });

    
  };

  onLoadMoreClick = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadModalPicture = url => {
    this.setState({ largeUrl: url, showModal: true });
  };

  render() {
    const { pictures, status, showModal, largeUrl } = this.state;
    const { loadModalPicture, toggleModal, onLoadMoreClick } = this;
    

    if (status === 'idle') {
      return <div className="startPage">Enter Something</div>;
    }
    if (status === 'pending') {
      return <Loader/>;
    }
    if (status === 'rejected') {
      return (
        <div className="info">
          <b>An Error occurred. Try again.</b>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div>
         
          <ul className="ImageGallery">
            {pictures.map(picture => (
              <ImageGalleryItem
                key={picture.id}
                webformatURL={picture.webformatURL}
                largeImageURL={picture.largeImageURL}
                onOpen={loadModalPicture}
              />
            ))}
          </ul>
          {showModal && (
            <Modal className= 'modalwdw' onClose={toggleModal}>
              <img src={largeUrl} alt="modal-img" />
              {/* <button type="button" onClick={toggleModal}>
                Close Modal
              </button> */}
              <Loader/>
            </Modal>
          )}
          <Button onLoadMoreClick={onLoadMoreClick} />
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  inputValue: PropTypes.string,
};
