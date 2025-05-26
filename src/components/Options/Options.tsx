import { Option } from '../Option/Option.tsx';
import css from './Options.module.css';
import { OptionsEnum } from './OptionsEnum.tsx';

interface OptionsProps {
  onClick: (feedbackType: string) => void;
  resetEnabled: boolean;
}

export const Options = ({ onClick, resetEnabled }: OptionsProps) => {
  return (
    <>
      <div className={css.container}>
        <Option text={OptionsEnum.GOOD} onClick={onClick} />
        <Option text={OptionsEnum.NEUTRAL} onClick={onClick} />
        <Option text={OptionsEnum.BAD} onClick={onClick} />
        {resetEnabled && <Option text={OptionsEnum.RESET} onClick={onClick} />}
      </div>
    </>
  );
};
