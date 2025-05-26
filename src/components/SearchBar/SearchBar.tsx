import css from './SearchBar.module.css';
import { useRef } from 'react';

interface SearchBarProps {
  onSearchSubmit: (query: string) => void;
}

export const SearchBar = ({ onSearchSubmit }: SearchBarProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <header>
        <form
          onSubmit={event => {
            event.preventDefault();
            onSearchSubmit(searchInputRef.current?.value ?? '');
          }}
          className={css.search_form}
        >
          <input
            ref={searchInputRef}
            className={css.search_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={css.search_btn}>
            Search
          </button>
        </form>
      </header>
    </>
  );
};
