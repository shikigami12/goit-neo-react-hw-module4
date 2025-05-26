import { Image } from '../../models/Image.ts';
import css from './ImageCard.module.css';

interface ImageCardProps {
  image: Image;
  onClick: (image: Image) => void;
}

export const ImageCard = ({ image, onClick }: ImageCardProps) => {
  return (
    <>
      <div className={css.container} onClick={() => onClick(image)}>
        <img
          src={image.urls.small}
          alt={image.description ?? image.user.username}
        />
      </div>
    </>
  );
};
