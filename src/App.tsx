import { Description } from './components/Description/Description.tsx';
import { Feedback } from './components/Feedback/Feedback.tsx';
import { Options } from './components/Options/Options.tsx';
import { Notification } from './components/Notification/Notification.tsx';
import { OptionsEnum } from './components/Options/OptionsEnum.tsx'; // Assuming this enum exists

import css from './App.module.css';
import { useEffect, useState } from 'react';

interface FeedbacksState {
  good: number;
  neutral: number;
  bad: number;
}

function App() {
  const storageKey = 'feedbacks';
  const [feedbacks, setFeedbacks] = useState<FeedbacksState>(() => {
    const storedValue = window.localStorage.getItem(storageKey);
    if (storedValue) {
      try {
        return JSON.parse(storedValue) as FeedbacksState;
      } catch (error) {
        console.error('Failed to parse feedbacks from localStorage:', error);
      }
    }
    return { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(feedbacks));
  }, [feedbacks]);

  const updateFeedback = (feedbackType: string) => {
    setFeedbacks(currentFeedbacks => {
      switch (feedbackType) {
        case OptionsEnum.GOOD:
          return { ...currentFeedbacks, good: currentFeedbacks.good + 1 };
        case OptionsEnum.NEUTRAL:
          return { ...currentFeedbacks, neutral: currentFeedbacks.neutral + 1 };
        case OptionsEnum.BAD:
          return { ...currentFeedbacks, bad: currentFeedbacks.bad + 1 };
        case OptionsEnum.RESET:
          return { good: 0, neutral: 0, bad: 0 };
        default:
          return currentFeedbacks;
      }
    });
  };

  const totalFeedback = feedbacks.good + feedbacks.neutral + feedbacks.bad;

  return (
    <>
      <div className={css.container}>
        <Description />
        <Options onClick={updateFeedback} resetEnabled={totalFeedback > 0} />
        {totalFeedback > 0 && (
          <Feedback
            good={feedbacks.good}
            bad={feedbacks.bad}
            neutral={feedbacks.neutral}
            total={totalFeedback}
            positivePercentage={Math.round(
              (feedbacks.good / totalFeedback) * 100
            )}
          />
        )}
        {totalFeedback === 0 && <Notification>No feedback yet.</Notification>}
      </div>
    </>
  );
}

export default App;
