import css from './Feedback.module.css';
import { OptionsEnum } from '../Options/OptionsEnum.tsx';

interface FeedbackProps {
  good: number;
  neutral: number;
  bad: number;
  total: number;
  positivePercentage: number;
}

export const Feedback = ({
  good,
  bad,
  neutral,
  total,
  positivePercentage,
}: FeedbackProps) => {
  return (
    <>
      <div className="container">
        <ul>
          <li className={css.item}>
            {OptionsEnum.GOOD}: {good}
          </li>
          <li className={css.item}>
            {OptionsEnum.NEUTRAL}: {neutral}
          </li>
          <li className={css.item}>
            {OptionsEnum.BAD}: {bad}
          </li>
          <li className={css.item}>Total: {total}</li>
          <li className={css.item}>Positive: {positivePercentage}%</li>
        </ul>
      </div>
    </>
  );
};
