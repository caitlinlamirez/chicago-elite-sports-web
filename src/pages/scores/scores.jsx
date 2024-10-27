import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './scores.css';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const Scores = () => {
  // State for filters
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTournament, setSelectedTournament] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [games, setGames] = useState([]);
  const [uniqueTeams, setUniqueTeams] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const query = useQuery();
  const teamFromQuery = query.get('team');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('https://ces-server.onrender.com/getGames'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Check if the response is an array before setting the state
        if (Array.isArray(data.games)) {
          const sortedGames = data.games.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.gameTime}`);
            const dateB = new Date(`${b.date} ${b.gameTime}`);
            return dateA - dateB; // Ascending order
          });
        
          setGames(sortedGames);

          const teams = [
            ...new Set(
              data.games.flatMap(game => [
                game.homeTeam ? game.homeTeam.teamName : null,
                game.awayTeam ? game.awayTeam.teamName : null,
              ])
            )
          ].filter(teamName => teamName); 

          setUniqueTeams(teams);
          if (teamFromQuery) {
            setSelectedTeam(decodeURIComponent(teamFromQuery));
          }
          console.log(data.games); // Log the data received
        } else {
          console.error('Expected an array, but received:', data);
        }
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };

    fetchGames(); // Call the fetch function
  }, [teamFromQuery]);
  
  // Filtered games based on selected filters
  const filteredGames = games.filter(game => {
    const gameYear = game.date.slice(-4);
    return (selectedYear ? gameYear === selectedYear : true) &&
           (selectedTournament ? game.tournament === selectedTournament : true) &&
           (selectedDivision ? game.recDivision === selectedDivision : true) &&
           (selectedTeam ? (game.homeTeam.teamName === selectedTeam || game.awayTeam.teamName === selectedTeam) : true);
  });

  return (
    <div className='scores-container'>
      <h2>Game Results</h2>
      <div className="heading-line"></div> 
  
      {/* Button to toggle filter visibility */}
      <button className = "show-filters-btn"onClick={() => setIsFilterVisible(!isFilterVisible)}>
        <i className="fa-solid fa-filter"></i>{isFilterVisible ? 'Hide Filters' : 'Show Filters'}
      </button>
  
      {/* Filter Bar */}
      {isFilterVisible && (
        <div className="filter-bar">
          <div className="filter">
            <label>Year:</label>
            <select className = 'select-dropdown' value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="">All Years</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div className="filter">
            <label>Tournament:</label>
            <select value={selectedTournament} onChange={(e) => setSelectedTournament(e.target.value)}>
              <option value="">All Tournaments</option>
              <option value="Halloween Classic 2024">Halloween Classic 2024</option>
            </select>
          </div>
          <div className="filter">
            <label>Rec Division:</label>
            <select value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)}>
              <option value="">All Divisions</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
          <div className="filter">
            <label>Team Name:</label>
            <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
              <option value="">All Teams</option>
              {uniqueTeams.map((team, index) => (
                <option key={index} value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>
      )}
  
      {/* Table Wrapped in a New Scores Container */}
      <div className="table-container">
        <table summary="This table shows the results for different games" className="table table-bordered dt-responsive">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Home</th>
              <th>Score</th>
              <th>Away</th>
              <th>Div</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.length > 0 ? (
              filteredGames.map((game, index) => (
                <tr key={index}>
                  <td>{game.date}</td>
                  <td>{game.gameTime}</td>
                  <td>
                    <div className='team-container'>
                      {game.recDivision !== "EVENT" && (
                        <img
                          className='team-logo'
                          src={game.homeTeam?.logo || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
                          alt="Team Logo"
                        />
                      )}
                      {game.homeTeam?.teamName || game.homeTeam}
                    </div>
                  </td>
                  <td>
                    <p className='game-score'>{game.score}</p>
                  </td>
                  <td>
                    <div className='team-container'>
                      {game.recDivision !== "EVENT" && (
                        <img
                          className='team-logo'
                          src={game.awayTeam?.logo || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
                          alt="Team Logo"
                        />
                      )}
                      {game.awayTeam?.teamName || game.awayTeam}
                    </div>
                  </td>
                  <td className={`text-center ${game.recDivision === "EVENT" ? 'bg-danger text-white fw-bold' : ''}`}>
                    {game.recDivision}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No games found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};
