import css from './ErrorMessage.module.css';

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <>
      <div className={css.container}>
        <div className={css.error_message}>
          <h2>Error</h2>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};
