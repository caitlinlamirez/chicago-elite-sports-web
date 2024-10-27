import React, { useEffect, useState } from 'react';
import './standings.css';

export const Standings = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [selectedDivision, setSelectedDivision] = useState('A'); // Default to Division A

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch('https://ces-server.onrender.com/getStandings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeams(data.standings);
        console.log(data.standings)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return <div>Loading standings...</div>;
  }

  if (error) {
    return <div>Error fetching standings: {error}</div>;
  }

  // Filter teams based on the selected division
  const filteredTeams = teams.filter(team => team.recDivision === selectedDivision);

  // Sort filtered teams based on points in descending order
  const sortedTeams = filteredTeams.sort((a, b) => b.points - a.points);

  return (
    <div className='standings-container'>
      <h2>Standings</h2>
      <div className="heading-line"></div> 
      {/* Button to toggle filter visibility */}
      <button className="show-filters-btn" onClick={() => setIsFilterVisible(!isFilterVisible)}>
        <i className="fa-solid fa-filter"></i>{isFilterVisible ? ' Hide Filters' : ' Show Filters'}
      </button>

      {/* Filter Bar */}
      {isFilterVisible && (
        <div className="filter-bar">
          <div className="filter">
            <label>Rec Division:</label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
            >
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
        </div>
      )}

<div className="table-container">
      <table summary="This table shows the standings for different games" className="table table-bordered dt-responsive">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
            <th>Shutouts</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => (
            <tr key={team._id}>
              <td>{index + 1}</td>
              <td className='team-row'>
              <img className='team-logo'
                  src={team.teamName.logo || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
                  alt="Team Logo"/>
                {team.teamName.teamName}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.ties}</td>
              <td>{team.shutouts}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};
