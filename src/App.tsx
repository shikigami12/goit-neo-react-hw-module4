import css from './App.module.css';
import 'modern-normalize/modern-normalize.css'
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
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, toggleLoading] = useToggle(false);

  const handlerOnSearch = async (query: string) => {
    setImages([]);
    setQuery(query);
    toggleLoading();
    const apiResponse: UnsplashResponse = await unsplashApiClient.searchPhotos(query, page);
    setTotalPages(apiResponse.total_pages);
    toggleLoading();
    setImages(apiResponse.results)
  }

  const handleLoadMore = async () => {
    setPage(prev => prev + 1);
    const apiResponse: UnsplashResponse = await unsplashApiClient.searchPhotos(query, page);
    console.log(apiResponse);
  }

  return (
    <>
      <div className={css.container}>
        <SearchBar onSearchSubmit={handlerOnSearch} />
        {isLoading && <Loader />}
        {images.length > 0 && <ImageGallery images={images} /> }
      </div>
    </>
  );
}

export default App;
