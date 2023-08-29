import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Event listener for window resize
    window.addEventListener('resize', updateWindowSize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
