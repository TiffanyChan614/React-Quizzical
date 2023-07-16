/* eslint-disable react/prop-types */
export default function ScoreRecord({ rank, username, score }) {
  return (
    <div className='scoreboard--record'>
      <span className='scoreboard--record--rank'>{rank}</span>
      <span className='scoreboard--record--username'>{username}</span>
      <span className='scoreboard--record--score'>{score}</span>
    </div>
  )
}
