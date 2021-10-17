export default function ImageGalleryItem({ props }) {
  const { id, webformatURL, tags = 'photo' } = props;
  return (
    <li className="ImageGalleryItem">
      <img
        id={id}
        src={webformatURL}
        alt={tags}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}
