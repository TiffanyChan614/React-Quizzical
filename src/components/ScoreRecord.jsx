/* eslint-disable react/prop-types */
import { AppContext } from '../App'
import { useContext } from 'react'

export default function ScoreRecord({ id, rank, username, score }) {
  const { theme, newlyAddedScore } = useContext(AppContext)
  return (
    <div
      className={`scoreboard--record ${theme} ${
        newlyAddedScore === id ? 'highlight' : ''
      }`}>
      <div className='scoreboard--record--rank'>{rank}</div>
      <div className='scoreboard--record--username'>{username}</div>
      <div className='scoreboard--record--score'>{score}</div>
    </div>
  )
}
