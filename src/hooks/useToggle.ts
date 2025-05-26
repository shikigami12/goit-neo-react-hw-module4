import { useState } from 'react';

export const useToggle = (defaultValue = false) => {
  const [isOpen, setIsToggled] = useState(defaultValue);

  const toggle = () => {
    setIsToggled(prev => !prev);
  };

  return [ isOpen, toggle ];
};