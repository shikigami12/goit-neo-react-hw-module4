export const Option = ({
  text,
  onClick,
}: {
  text: string;
  onClick: (feedbackType: string) => void;
}) => {
  return (
    <>
      <button onClick={() => onClick(text)}>{text}</button>
    </>
  );
};
