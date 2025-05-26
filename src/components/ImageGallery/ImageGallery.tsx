import { Image } from '../../models/Image.ts';
import { ImageCard } from '../ImageCard/ImageCard.tsx';
import css from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

export const ImageGallery = ({ images, onImageClick }: ImageGalleryProps) => {
  return (
    <>
      <div className={css.container}>
        <ul className={css.gallery}>
          {images.map(image => (
            <li key={image.id}>
              <ImageCard image={image} onClick={onImageClick}/>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
