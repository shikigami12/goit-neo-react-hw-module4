import { Image } from '../../models/Image.ts';
import css from './ImageCard.module.css';

interface ImageCardProps {
  image: Image;
}

export const ImageCard = ({ image }: ImageCardProps) => {
  return <>
    <div className={css.container}>
      <img src={image.urls.small} alt={image.description ?? image.user.username} />
    </div>
  </>;
};
