import css from './App.module.css';
import Modal from 'react-modal';
import 'modern-normalize/modern-normalize.css';
import { SearchBar } from './components/SearchBar/SearchBar.tsx';
import { UnsplashApiClient } from './clients/UnsplashApiClient.ts';
import { UnsplashResponse } from './models/Unsplash.response.ts';
import { useEffect, useState, useRef } from 'react';
import { Image } from './models/Image.ts';
import { ImageGallery } from './components/ImageGallery/ImageGallery.tsx';
import { useToggle } from './hooks/useToggle.ts';
import { Loader } from './components/Loader/Loader.tsx';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage.tsx';
import { ImageModal } from './components/ImageModal/ImageModal.tsx';
import { LoadMoreButton } from './components/LoadMoreButton/LoadMoreButton.tsx';

function App() {
  const unsplashApiClient = new UnsplashApiClient();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [isLoading, toggleLoading] = useToggle(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, toggleModal] = useToggle(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    if (images.length > 0 && page > 1) {
      scrollToBottom();
    }
    if (isLoading && page > 1) {
      scrollToBottom();
    }
  }, [images, isLoading]);

  useEffect(() => {
    if(page === 1) {
      setImages([]);
    }
    
    const fetchImages = async () => {
      try {
        const apiResponse: UnsplashResponse = await unsplashApiClient.searchPhotos(query, page);
        setImages(prevImages => [...prevImages, ...apiResponse.results]);
        setHasMoreImages(apiResponse.total_pages > page);
      } catch (error) {
        console.error('Error searching images:', error);
        setError('Failed to load images. Please try again later.');
      } finally {
        toggleLoading();
      }
    };
    if (query) {
      toggleLoading();
      fetchImages();
    }
  }, [query, page]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlerOnSearch = async (query: string) => {
    setError(null);
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = async () => {
    setPage(page => page + 1);
  };

  const handleImageClick = (image: Image) => {
    toggleModal();
    setSelectedImage(image);
  };

  const handleModalClose = () => {
    toggleModal();
    setSelectedImage(null);
  };

  return (
    <>
      <div className={css.container}>
        <SearchBar onSearchSubmit={handlerOnSearch} />
        {!error && images.length > 0 && (
          <ImageGallery images={images} onImageClick={handleImageClick} />
        )}
        {isLoading && <Loader />}
        {!error && hasMoreImages && !isLoading && (
          <LoadMoreButton onClick={handleLoadMore} />
        )}
        {error && <ErrorMessage message={error} />}
        {selectedImage && (
          <ImageModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            image={selectedImage}
          />
        )}
        <div ref={bottomRef} />
      </div>
    </>
  );
}

export default App;
