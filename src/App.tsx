import css from './App.module.css';
import Modal from 'react-modal';
import 'modern-normalize/modern-normalize.css';
import { SearchBar } from './components/SearchBar/SearchBar.tsx';
import { UnsplashApiClient } from './clients/UnsplashApiClient.ts';
import { UnsplashResponse } from './models/Unsplash.response.ts';
import { useEffect, useState } from 'react';
import { Image } from './models/Image.ts';
import { ImageGallery } from './components/ImageGallery/ImageGallery.tsx';
import { useToggle } from './hooks/useToggle.ts';
import { Loader } from './components/Loader/Loader.tsx';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage.tsx';
import { ImageModal } from './components/ImageModal/ImageModal.tsx';

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

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const handlerOnSearch = async (query: string) => {
    try {
      setError(null);
      setImages([]);
      setQuery(query);
      setPage(1);
      toggleLoading();
      const apiResponse: UnsplashResponse =
        await unsplashApiClient.searchPhotos(query, 1);
      setImages(apiResponse.results);
      setHasMoreImages(apiResponse.total_pages > 1);
    } catch (error) {
      console.error('Error searching images:', error);
      setError('Failed to load images. Please try again later.');
    } finally {
      toggleLoading();
    }
  };

  const handleLoadMore = async () => {
    try {
      toggleLoading();
      const nextPage = page + 1;
      const apiResponse: UnsplashResponse =
        await unsplashApiClient.searchPhotos(query, nextPage);

      setImages(prevImages => [...prevImages, ...apiResponse.results]);
      setPage(nextPage);
      setHasMoreImages(nextPage < apiResponse.total_pages);
    } catch (error) {
      console.error('Error loading more images:', error);
      setError('Failed to load more images. Please try again later.');
    } finally {
      toggleLoading();
    }
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
          <button className={css.loadMoreButton} onClick={handleLoadMore}>
            Load More
          </button>
        )}
        {error && <ErrorMessage message={error} />}
        {selectedImage && (
          <ImageModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            image={selectedImage}
          />
        )}
      </div>
    </>
  );
}

export default App;
