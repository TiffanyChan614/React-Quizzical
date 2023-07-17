import { useState, useContext } from 'react'
import { AppContext } from '../../App'
import ScoreRecord from '../common/ScoreRecord'
import { CATEGORIES } from '../../utils/constants'
import he from 'he'

export default function ContentScoreboard() {
  const { scoreboard, theme } = useContext(AppContext)
  const [category, setCategory] = useState('Any Category')

  function changeCategory(e) {
    setCategory(e.target.value)
  }

  return (
    <div className='scoreboard content'>
      <h1 className={`scoreboard--title ${theme}`}>Scoreboard</h1>
      <select
        className={`scoreboard--type ${theme}`}
        onChange={changeCategory}>
        {CATEGORIES.map((category) => (
          <option
            key={category.name}
            value={category.value}>
            {he.decode(category.name)}
          </option>
        ))}
      </select>
      {scoreboard && scoreboard[category]?.length > 0 ? (
        <div className='scoreboard--records'>
          {/* {scoreboard[category].map((record) => (
            <ScoreRecord
              key={record.id}
              rank={record.rank}
              username={record.username}
              score={record.score}
            />
          ))} */}
        </div>
      ) : (
        <div>
          <h2>No records.</h2>
          <p>Take another quiz and update your score!</p>
        </div>
      )}
    </div>
  )
}
