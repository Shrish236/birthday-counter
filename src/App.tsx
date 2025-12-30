import { useState, useEffect } from 'react';
import './App.css';
import Countdown from './components/Countdown';
import BirthdayGallery from './components/BirthdayGallery';

function App() {
  const [currentState, setCurrentState] = useState<'countdown' | 'birthday' | 'past'>('countdown');

  // Birthday: January 7, 2003
  const BIRTHDAY_MONTH = 0; // January (0-indexed)
  const BIRTHDAY_DAY = 7;
  const BIRTH_YEAR = 2003;

  useEffect(() => {
    const checkBirthdayState = () => {
      // Get current time in IST
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
      const istTime = new Date(now.getTime() + istOffset);


      const currentMonth = istTime.getMonth();
      const currentDay = istTime.getDate();

      console.log(currentMonth, currentDay);

      // Check if today is the birthday
      if (currentMonth === BIRTHDAY_MONTH && currentDay === BIRTHDAY_DAY) {
        setCurrentState('birthday');
      }
      // Check if birthday has passed this year
      else if (
        currentMonth > BIRTHDAY_MONTH ||
        (currentMonth === BIRTHDAY_MONTH && currentDay > BIRTHDAY_DAY)
      ) {
        setCurrentState('past');
      }
      else {
        setCurrentState('countdown');
      }
    };

    checkBirthdayState();
    const interval = setInterval(checkBirthdayState, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      {currentState === 'birthday' ? (
        <BirthdayGallery birthYear={BIRTH_YEAR} />
      ) : (
        <Countdown
          birthdayMonth={BIRTHDAY_MONTH}
          birthdayDay={BIRTHDAY_DAY}
          birthYear={BIRTH_YEAR}
          isPast={currentState === 'past'}
        />
      )}
    </div>
  );
}

export default App;
