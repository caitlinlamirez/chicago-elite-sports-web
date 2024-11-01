import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Countdown.css';
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    const countDown = new Date('November 2, 2024').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDown - now;

      // Update the state with the remaining time
      setTimeLeft({
        days: Math.floor(distance / day),
        hours: Math.floor((distance % day) / hour),
        minutes: Math.floor((distance % hour) / minute),
        seconds: Math.floor((distance % minute) / second),
      });

      // Handle when the countdown reaches zero
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({
          days:0,
          hours: 0,
          minutes:0, 
          seconds: 0
        });
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="countdown">
      <h2 id="headline">Halloween Classic 2024 Countdown</h2>
      <img src="./countdown.svg" alt="Jack-o-laterns with text that says: Let the Games Begin" class="countdown-image" />
      <ul>
        <li>
          <div className="number-box"><span>{timeLeft.days}</span></div>
          <div className='time-type'>days</div>
        </li>
        <li>
          <div className="number-box"><span>{timeLeft.hours}</span></div>
          <div>Hours</div>
        </li>
        <li>
          <div className="number-box"><span>{timeLeft.minutes}</span></div>
          <div>Min</div>
        </li>
        <li>
          <div className="number-box"><span>{timeLeft.seconds}</span></div>
          <div>Sec</div>
        </li>
      </ul>
      
      <div class="learn-more-container">
      <Link to="/about" className="learn-more-btn">Learn More</Link>
      </div>
    </section>
  );
};

export default Countdown;
