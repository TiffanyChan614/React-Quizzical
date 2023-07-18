/* eslint-disable react/prop-types */
export default function ScoreRecord({ rank, username, score }) {
  return (
    <div className='scoreboard--record'>
      <div className='scoreboard--record--rank'>{rank}</div>
      <div className='scoreboard--record--username'>{username}</div>
      <div className='scoreboard--record--score'>{score}</div>
    </div>
  )
}
