import React, { useEffect, useState } from 'react';
import Countdown from './Countdown';
import Carousel from 'react-bootstrap/Carousel';
import './home.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [teams, setTeams] = useState([]); // State to hold the teams data

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('https://ces-server.onrender.com/getTeams');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched teams data:', data);
  
        // Check if data is an array before setting it
        if (Array.isArray(data.teams)) {
          setTeams(data.teams);
        } else {
          console.error('Expected an array but received:', data);
          setTeams([]); // Reset to an empty array on error
        }
      } catch (error) {
        console.error('There was a problem fetching the teams:', error);
        setTeams([]); // Ensure teams is reset to an empty array on error
      }
    };
  
    fetchTeams();
  }, []);
  
  return (
    <div className='home-container'>
      <Countdown />
      <section id="about">
        <h2>Welcome to Chicago Elite Sports</h2>
        <Carousel>
          <Carousel.Item>
            <img className="carousel-img" src="/carousel1.png" alt="Summer Cup" />
          </Carousel.Item>
          <Carousel.Item>          
            <img className="carousel-img" src="/carousel2.png" alt="Summer Cup" />
          </Carousel.Item>
          
        </Carousel>
        <p className='event-paragraph'>Get ready for the Halloween Classic 2024! This exciting tournament brings together teams from all over the Midwest for a thrilling weekend of hockey. Watch as players showcase their skills in fast-paced matches, and cheer them on during special competitions like the Hardest Shot and Shootout challenges. 
          <br></br> <br></br>With a festive atmosphere, music, and Halloween-themed fun, this is an event for fans of all ages. Don your best Halloween costumes and join us for an unforgettable celebration of hockey and community spirit!</p>
      </section>
      <section id="teams">
        <h2>Participating Teams</h2>
        <div className="team-list">
            {teams.map((team, index) => (
                <div className="team" key={index}>
                    <Link to={`/results?team=${encodeURIComponent(team.teamName)}`}>
                        <img src={team.logo} alt={team.teamName} /> {/* Displaying logo */}
                        <h3>{team.teamName}</h3> {/* Displaying team name */}
                    </Link>
                </div>
            ))}
        </div>
    </section>
      <section id="sponsors">
        <h2>Our Sponsors</h2>
        <img id="knapper-logo"src="./knapper.png"></img>
        <img id="lamirez-logo"src="./lamirez_labs.png"></img>
      </section>
    </div>
  );
};
