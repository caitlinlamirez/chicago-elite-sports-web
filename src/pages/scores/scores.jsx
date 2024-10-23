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
    { year: '2024', tournament: 'Halloween Bash', time: '10:00 AM', home: 'Wicked Wizards', score: '5 - 3', away: 'Spooky Spirits', division: 'A' },
    { year: '2024', tournament: 'Spooky Cup', time: '12:30 PM', home: 'Ghostly Ghouls', score: '2 - 4', away: 'Vampire Vipers', division: 'B' },
    { year: '2023', tournament: 'Spooky Cup', time: '3:00 PM', home: 'Vampire Vipers', score: '3 - 5', away: 'Wicked Wizards', division: 'A' },
    { year: '2023', tournament: 'Halloween Bash', time: '5:30 PM', home: 'Spooky Spirits', score: '1 - 3', away: 'Ghostly Ghouls', division: 'B' },
    { year: '2024', tournament: 'Halloween Bash', time: '7:00 PM', home: 'Wicked Wizards', score: '4 - 2', away: 'Ghostly Ghouls', division: 'A' },
    { year: '2024', tournament: 'Spooky Cup', time: '9:30 PM', home: 'Spooky Spirits', score: '2 - 2', away: 'Vampire Vipers', division: 'B' }
  ];

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
                  <th>Time</th>
                  <th>Home</th>
                  <th>Score</th>
                  <th>Away</th>
                  <th>Rec Division</th>
                </tr>
              </thead>
              <tbody>
                {filteredGames.length > 0 ? (
                  filteredGames.map((game, index) => (
                    <tr key={index}>
                      <td>{game.time}</td>
                      <td>{game.home}</td>
                      <td>
                        <p className='game-score'>
                         {game.score} 
                        </p>
                        
                      </td>
                      <td>{game.away}</td>
                      <td>{game.division}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No games found</td>
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
