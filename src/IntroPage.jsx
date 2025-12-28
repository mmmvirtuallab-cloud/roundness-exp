import React from "react";
import { useNavigate } from "react-router-dom";
import { INTRO_CONTENT } from "./data/intro_data";
import styles from "./IntroPage.module.css"; // Assuming CSS Modules

const IntroPage = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    // Navigates to the main site Home (outside this React app)
    window.location.href = "../home/";
  };

  const handleExperimentClick = () => {
    // Check for mobile width
    if (window.innerWidth <= 768) {
      alert(
        "This experiment is designed for larger screens (Laptop/Desktop). Please switch to a larger device for the best experience."
      );
    } else {
      // UPDATED: Changed from "/lab" to "/experiment" to match your App.js router
      navigate("/experiment");
    }
  };

  return (
    <div className={styles["intro-container"]}>
      <header className={styles["intro-header"]}>
        <div className={styles["header-title"]}>
          {INTRO_CONTENT.headerTitle}
        </div>

        <div className={styles["header-actions"]}>
          <button
            className={`${styles["header-btn"]} ${styles["home-btn"]}`}
            onClick={handleHomeClick}
          >
            Home
          </button>

          <button
            className={styles["header-btn"]}
            onClick={handleExperimentClick}
          >
            {INTRO_CONTENT.buttonLabel} →
          </button>
        </div>
      </header>

      <main className={styles["content-wrapper"]}>
        <div className={styles["info-card"]}>
          <h1>{INTRO_CONTENT.mainHeading}</h1>
          <hr className={styles["divider"]} />

          <div className={styles["description-area"]}>
            <div className={styles["aim-section"]}>
              <h3>{INTRO_CONTENT.aimTitle}</h3>
              <p>{INTRO_CONTENT.aimContent}</p>
            </div>

            <div className={styles["ack-section"]}>
              <h3>{INTRO_CONTENT.ackTitle}</h3>
              <p>{INTRO_CONTENT.ackContent}</p>
            </div>

            <ul className={styles["student-list"]}>
              {INTRO_CONTENT.students.map((student, index) => (
                <li key={index}>{student}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <footer className={styles["intro-footer"]}>
        <p
          dangerouslySetInnerHTML={{
            __html:
              INTRO_CONTENT.footerText ||
              "Developed and coordinated by: Dr. S.Vijayakumar, Dr.S.Sathish Department of Production Technology, MIT Campus, Anna University, Chennai.",
          }}
        />
      </footer>
    </div>
  );
};

export default IntroPage;
