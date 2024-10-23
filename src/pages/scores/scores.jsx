import React, { useState } from 'react';
import './scores.css';

export const Scores = () => {
  // State for filters
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTournament, setSelectedTournament] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  // Sample game data
  const games = [
    // Saturday, 11/2/2024
    { date: '2024-11-02', tournament: 'Halloween Classic 2024', time: '10:00 AM', home: 'Chicago Snipers', score: '0 - 0', away: 'Chicago Stingrays', division: 'B' },
    { date: '2024-11-02', tournament: 'Halloween Classic 2024', time: '11:00 AM', home: 'Dynamos', score: '0 - 0', away: 'HDH', division: 'B' },
    { date: '2024-11-02', tournament: 'Halloween Classic 2024', time: '12:00 PM', home: 'Rays', score: '0 - 0', away: 'Kings', division: 'B' },
    { date: '2024-11-02', tournament: 'Halloween Classic 2024', time: '1:00 PM', home: 'Indiana', score: '0 - 0', away: 'Rays B', division: 'B' },
    { date: '2024-11-02', tournament: 'Halloween Classic 2024', time: '2:00 PM', home: '', score: 'N/A', away: '', division: '' }, // Special event, no teams
    { date: '2024-11-02', tournament: 'Halloween Classic 2024', time: '3:00 PM', home: 'Toros', score: '0 - 0', away: 'Indiana', division: 'B' },
    { date: '2024-11-02', tournament: 'Halloween Classic 2024', time: '4:00 PM', home: 'HDH', score: '0 - 0', away: 'Rays B', division: 'B' },
    { date: '2024-11-02', tournament: 'Halloween Classic 2024', time: '5:00 PM', home: 'Snipers', score: '0 - 0', away: 'Kings', division: 'B' },
    { date: '2024-11-02', tournament: 'Halloween Classic 2024', time: '6:00 PM', home: 'Toros', score: '0 - 0', away: 'Dynamos', division: 'B' },
  
    // Sunday, 11/3/2024
    { date: '2024-11-03', tournament: 'Halloween Classic 2024', time: '9:00 AM', home: 'Seed 5 (B)', score: '0 - 0', away: 'Seed 4 (B)', division: 'B' },
    { date: '2024-11-03', tournament: 'Halloween Classic 2024', time: '10:00 AM', home: 'Seed 2 (B)', score: '0 - 0', away: 'Seed 3 (B)', division: 'B' },
    { date: '2024-11-03', tournament: 'Halloween Classic 2024', time: '11:00 AM', home: 'Seed 1 (B)', score: '0 - 0', away: 'Winner 4/5', division: 'B' },
    { date: '2024-11-03', tournament: 'Halloween Classic 2024', time: '12:00 PM', home: 'Seed 2 (A)', score: '0 - 0', away: 'Seed 3 (A)', division: 'A' },
    { date: '2024-11-03', tournament: 'Halloween Classic 2024', time: '1:00 PM', home: 'Winner 1', score: '0 - 0', away: 'Winner 2', division: 'A' },
    { date: '2024-11-03', tournament: 'Halloween Classic 2024', time: '2:00 PM', home: 'Winner 2/3', score: '0 - 0', away: 'Seed 1 (A)', division: 'A' },
  ];
  
  

  // Helper function to format date
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`; // Returns MM/DD/YYYY
  };

  // Filtered games based on selected filters
  const filteredGames = games.filter(game => {
    return (selectedYear ? game.year === selectedYear : true) &&
           (selectedTournament ? game.tournament === selectedTournament : true) &&
           (selectedDivision ? game.division === selectedDivision : true) &&
           (selectedTeam ? (game.home === selectedTeam || game.away === selectedTeam) : true);
  });

  return (
    <div className='scores-container'>
      <h2>Game Results</h2>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter">
          <label>Year:</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className="filter">
          <label>Tournament:</label>
          <select value={selectedTournament} onChange={(e) => setSelectedTournament(e.target.value)}>
            <option value="">All Tournaments</option>
            <option value="Halloween Bash">Halloween Bash</option>
            <option value="Spooky Cup">Spooky Cup</option>
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
            <option value="Wicked Wizards">Wicked Wizards</option>
            <option value="Spooky Spirits">Spooky Spirits</option>
            <option value="Ghostly Ghouls">Ghostly Ghouls</option>
            <option value="Vampire Vipers">Vampire Vipers</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <table summary="This table shows the results for different games" className="table table-bordered dt-responsive">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Home</th>
                  <th>Score</th>
                  <th>Away</th>
                  <th>Rec Div</th>
                </tr>
              </thead>
              <tbody>
                {filteredGames.length > 0 ? (
                  filteredGames.map((game, index) => (
                    <tr key={index}>
                      <td>{formatDate(game.date)}</td> {/* Format the date here */}
                      <td>{game.time}</td>
                      <td>
                        <div className='team-container'>
                          <img className='team-logo' src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'></img>
                        {game.home}
                        </div>
                      </td>
                      <td>
                        <p className='game-score'>{game.score}</p>
                      </td>
                      <td>
                        <div className='team-container'>
                          <img className='team-logo' src='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'></img>
                        {game.away}
                        </div>
                      </td>
                      <td>{game.division}</td>
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
      </div>
    </div>
  );
};
