import { Image } from '../../models/Image.ts';
import { ImageCard } from '../ImageCard/ImageCard.tsx';
import css from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: Image[]
}

export const ImageGallery = ({images}: ImageGalleryProps) => {
  return (
    <>
      <div className={css.container}>
        <ul className={css.gallery}>
          {images.map((image) => (
            <li key={image.id}>
              <ImageCard image={image} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
