import Modal from 'react-modal';
import css from './ImageModal.module.css';
import { Image } from '../../models/Image.ts';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image;
}

export const ImageModal = ({ image, onClose, isOpen }: ImageModalProps) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={css.modal_content}
        overlayClassName={css.modal + ' ' + css.backdrop}
        shouldCloseOnOverlayClick={true}
      >
        <img
          src={image.urls.full}
          alt={image.description ?? 'No description'}
          className={css.modal_image_style}
        />
      </Modal>
    </>
  );
};
