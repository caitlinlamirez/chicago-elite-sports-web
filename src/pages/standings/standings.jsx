import React from 'react';
import './standings.css';

export const Standings = () => {
  // Sample data for the hockey tournament standings
  const teams = [
    { rank: 1, name: "Maple Leafs", wins: 30, losses: 10, ties: 5, shutouts: 3, points: 65 },
    { rank: 2, name: "Canadiens", wins: 28, losses: 12, ties: 5, shutouts: 2, points: 61 },
    { rank: 3, name: "Red Wings", wins: 25, losses: 15, ties: 5, shutouts: 1, points: 55 },
    { rank: 4, name: "Blackhawks", wins: 23, losses: 17, ties: 5, shutouts: 4, points: 52 },
    { rank: 5, name: "Penguins", wins: 20, losses: 20, ties: 5, shutouts: 2, points: 45 },
    { rank: 6, name: "Rangers", wins: 18, losses: 22, ties: 5, shutouts: 1, points: 42 },
    { rank: 7, name: "Flyers", wins: 15, losses: 25, ties: 5, shutouts: 0, points: 35 },
    { rank: 8, name: "Capitals", wins: 12, losses: 28, ties: 5, shutouts: 1, points: 30 },
  ];

  return (
    <div className='standings-container'>
      <h2>Standings</h2>
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
          {teams.map((team) => (
            <tr key={team.rank}>
              <td>{team.rank}</td>
              <td>{team.name}</td>
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
  );
};
