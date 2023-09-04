import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul className="gallery">
      {images.map(image => {
        return <ImageGalleryItem key={image.id} image={image} />;
      })}
    </ul>
  );
};
