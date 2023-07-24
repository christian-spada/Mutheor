import NavBar from './NavBar/NavBar';
import Hero from './Hero/Hero';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const user = useSelector(state => state.session.user);
  const instrumentsText = useRef();
  const instrumentsImg = useRef();
  const sessionsText = useRef();
  const sessionsImg = useRef();
  const goalsText = useRef();
  const goalsImg = useRef();

  const elementRefs = [
    instrumentsText,
    instrumentsImg,
    sessionsText,
    sessionsImg,
    goalsText,
    goalsImg,
  ];

  useEffect(() => {
    const handleIntersect = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.tagName === 'DIV') {
          entry.target.classList.add('show-text');
        }
        if (entry.isIntersecting && entry.target.tagName === 'IMG') {
          entry.target.classList.add('show-img');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect);

    elementRefs.forEach(ref => {
      observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="landing-page">
      <header style={{ position: 'sticky', top: 0 }}>
        <NavBar user={user} />
      </header>
      <Hero />
      <section className="instruments-section">
        <div className="instruments-section__content-container">
          <div
            ref={instrumentsText}
            className="fade"
          >
            <h2 className="instruments__headline">
              Create records for all of your instruments
            </h2>
            <h3 className="subheading">
              Keep all of your instruments in one place with pictures and info on them
            </h3>
          </div>
          <img
            ref={instrumentsImg}
            src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Instrument-card-image.png"
            alt="instrument-card"
            className="fade"
          ></img>
        </div>
      </section>
      <section className="sessions-section">
        <div className="sessions-section__content-container">
          <div
            ref={sessionsText}
            className="fade"
          >
            <h2 className="sessions__headline">
              Create records for all of your practice sessions. Upload your own pictures as
              well.
            </h2>
            <h3 className="subheading">
              Keep record of all of your sessions with date information and notes on the
              session
            </h3>
          </div>
          <img
            ref={sessionsImg}
            src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Session-Card-image.png"
            alt="session-card"
            className="fade"
          ></img>
        </div>
      </section>
      <section className="goals-section">
        <div className="goals-section__content-container">
          <div
            ref={goalsText}
            className="fade"
          >
            <h2 className="goals__headline">
              Create records for all of your goals. Upload your own pictures as well.
            </h2>
            <h3 className="subheading">Set goals to keep yourself accountable</h3>
          </div>
          <img
            ref={goalsImg}
            src="https://my-mutheor-user-images-bucket.s3.amazonaws.com/Goal-Card-image.png"
            alt="goal-card"
            className="fade"
          ></img>
        </div>
      </section>
      <footer className="landing-page__footer"></footer>
    </div>
  );
};

export default LandingPage;
