import React from 'react';
import './scrolltotopbutton.css';

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button className="scroll-to-top" onClick={handleScrollToTop} title="Back to top">
      ↑
    </button>
  );
};

export default ScrollToTopButton;
