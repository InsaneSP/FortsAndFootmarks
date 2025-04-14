import React, { useEffect, useState } from "react";
import './disclaimer.css';

const DisclaimerPopup = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const disclaimerAccepted = sessionStorage.getItem("disclaimerAccepted");

    if (!disclaimerAccepted) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("disclaimerAccepted", "true");
    setShowDisclaimer(false);
  };

  return (
    <>
      {showDisclaimer && (
        <div className="disclaimer-overlay">
          <div className="disclaimer-box shadow-lg">
            <h2 className="fw-bold">Disclaimer</h2>
            <p className="mb-3">
              The information on this site is collected from various sources
              including local stories, guides, and public records. While we
              strive for accuracy, we do not claim everything here is 100%
              historically verified. Fort-related stories can vary by region and tradition.
              <br /><br />
              This site is meant as a helpful trekking guide, not an official
              historical reference. Please explore responsibly and cross-check when in doubt.
            </p>
            <span className="disclaimer-final-note">
              By clicking "I Understand", you acknowledge and agree to this disclaimer.
            </span>
            <button onClick={handleAccept} className="disclaimer-button mt-3">
              I Understand
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DisclaimerPopup;
