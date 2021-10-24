import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchPictures } from '../Services/ImageFinderAPI';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader.jsx';
import Modal from '../ModalWindow/ModalWindow';
import scrollToBottom from '../scroll/scroll';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export default function ImageGallery({ inputValue }) {
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [largeUrl, setlargeUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!inputValue) {
      return;
    }
    setStatus(Status.PENDING);
    setPage(1);
    fetchPictures(inputValue, page)
      .then(fetchedPictures => {
        console.log(fetchedPictures);
        if (fetchedPictures.length === 0) {
          setStatus(Status.REJECTED);
        }
        setPictures(fetchedPictures);
      })
      .then(setStatus(Status.RESOLVED))

      .catch(evt => {
        setStatus(status.REJECTED);
      });
  }, [inputValue]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setStatus(Status.PENDING);
    fetchPictures(inputValue, page)
      .then(fetchedPictures => {
        if (fetchedPictures.length === 0) {
          return setStatus(Status.REJECTED);
        }
        setPictures([...pictures, ...fetchedPictures]);
      })
      .then(setStatus(Status.RESOLVED))
      .then(() => {
        scrollToBottom();
      })
      .catch(evt => setStatus(Status.REJECTED));
  }, [page]);

  const onLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const loadModalPicture = url => {
    setlargeUrl(url);
    setShowModal(true);
  };

  if (status === Status.IDLE) {
    return <div className="startPage">Enter Something</div>;
  }
  if (status === Status.PENDING) {
    return <Loader />;
  }
  if (status === Status.REJECTED) {
    return (
      <div className="info">
        <b>An Error occurred. Try again.</b>
      </div>
    );
  }
  if (status === Status.RESOLVED) {
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
          <Modal className="modalwdw" onClose={toggleModal}>
            <img src={largeUrl} alt="modal-img" />
            <Loader />
          </Modal>
        )}
        <Button onLoadMoreClick={onLoadMoreClick} />
      </div>
    );
  }
}
