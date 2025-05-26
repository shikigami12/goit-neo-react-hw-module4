import css from './LoadMoreButton.module.css';

interface LoadMoreButtonProps {
  onClick: () => Promise<void>;
}

export const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => {
  return <>
    <div className={css.container}>
      <button className={css.loadMoreButton} onClick={() => onClick()}>
        Load More
      </button>
    </div>
  </>;
};
