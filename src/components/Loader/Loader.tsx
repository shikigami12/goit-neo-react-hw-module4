import { PropagateLoader } from 'react-spinners';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <>
      <div className={css.container}>
        <PropagateLoader color={'#00BFFF'} />
      </div>
    </>
  );
};
