import css from './App.module.css';
import 'modern-normalize/modern-normalize.css';
import { SearchBar } from './components/SearchBar/SearchBar.tsx';
import { UnsplashApiClient } from './clients/UnsplashApiClient.ts';
import { UnsplashResponse } from './models/Unsplash.response.ts';
import { useState } from 'react';
import { Image } from './models/Image.ts';
import { ImageGallery } from './components/ImageGallery/ImageGallery.tsx';
import { useToggle } from './hooks/useToggle.ts';
import { Loader } from './components/Loader/Loader.tsx';

function App() {
  const unsplashApiClient = new UnsplashApiClient();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<Image[]>([]);
  const [hasMoreImages, setHasMoreImages] = useState(false);
  const [isLoading, toggleLoading] = useToggle(false);

  const handlerOnSearch = async (query: string) => {
    try {
      setImages([]);
      setQuery(query);
      setPage(1);
      toggleLoading();

      const apiResponse: UnsplashResponse = await unsplashApiClient.searchPhotos(query, 1);
      setImages(apiResponse.results);
      setHasMoreImages(apiResponse.total_pages > 1);
    } catch (error) {
      console.error('Error searching images:', error);
    } finally {
      toggleLoading();
    }
  };

  const handleLoadMore = async () => {
    try {
      toggleLoading();
      const nextPage = page + 1;
      const apiResponse: UnsplashResponse = await unsplashApiClient.searchPhotos(query, nextPage);

      setImages(prevImages => [...prevImages, ...apiResponse.results]);
      setPage(nextPage);
      setHasMoreImages(nextPage < apiResponse.total_pages);
    } catch (error) {
      console.error('Error loading more images:', error);
    } finally {
      toggleLoading();
    }
  };

  return (
    <div className={css.container}>
      <SearchBar onSearchSubmit={handlerOnSearch} />
      {isLoading && <Loader />}
      {images.length > 0 && <ImageGallery images={images} />}
      {hasMoreImages && !isLoading && (
        <button
          className={css.loadMoreButton}
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default App;