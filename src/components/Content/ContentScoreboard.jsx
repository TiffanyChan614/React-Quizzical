import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../App'
import ScoreRecord from '../common/ScoreRecord'
import { CATEGORIES } from '../../utils/constants'
import { fetchScoresByCategory } from '../../services/scoreService'
import he from 'he'

export default function ContentScoreboard() {
  const { theme } = useContext(AppContext)
  const [category, setCategory] = useState('0')
  const [scoreboard, setScoreboard] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const scores = await fetchScoresByCategory(category)
      setScoreboard(scores)
    }
    fetchData()
  }, [category])

  function changeCategory(e) {
    setCategory(e.target.value)
  }

  return (
    <div className='scoreboard content'>
      <h1 className={`scoreboard--title ${theme}`}>Scoreboard</h1>
      <select
        className={`scoreboard--type ${theme}`}
        onChange={changeCategory}
        value={category}>
        {[{ value: '0', name: 'Overall' }]
          .concat(CATEGORIES)
          .map((category) => (
            <option
              key={category.name}
              value={category.value}>
              {he.decode(category.name)}
            </option>
          ))}
      </select>
      {scoreboard && scoreboard?.length > 0 ? (
        <div className='scoreboard--records'>
          {scoreboard.map((record) => (
            <ScoreRecord
              key={record.id}
              id={record.id}
              rank={record.rank}
              username={record.name}
              score={record.weightedScore}
            />
          ))}
        </div>
      ) : (
        <div className='scoreboard--no-records'>
          <h2>No records</h2>
          <p>Take addDoc quiz and update your score!</p>
        </div>
      )}
    </div>
  )
}
