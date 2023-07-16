import { useContext } from 'react'
import { AppContext } from '../../App'
import ScoreRecord from '../common/ScoreRecord'

export default function ContentScoreboard() {
  const { scoreboard, theme } = useContext(AppContext)

  return (
    <div className='scoreboard content'>
      <h1 className={`scoreboard--title ${theme}`}>Scoreboard</h1>
      {scoreboard.length > 0 ? (
        <div className='scoreboard--records'>
          {scoreboard.map((record) => (
            <ScoreRecord
              key={record.id}
              rank={record.rank}
              username={record.username}
              score={record.score}
            />
          ))}{' '}
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
