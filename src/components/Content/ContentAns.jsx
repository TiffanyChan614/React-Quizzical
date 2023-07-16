import { useContext } from 'react'
import { AppContext } from '../../App'
import Question from '../Question'

export default function PageAns() {
  const {
    questionsData,
    setQuestionsData,
    score,
    setScore,
    setCurrentPage,
    theme,
  } = useContext(AppContext)

  function handlePlayAgainClick() {
    setCurrentPage((oldPage) => (oldPage + 1) % 3)
    setQuestionsData([])
    setScore(0)
  }

  if (!questionsData) {
    return null
  }

  return (
    <div className='ans content'>
      <div className='ans--questions'>
        {questionsData.map((question) => (
          <Question
            question={question}
            key={question.id}
            questionId={question.id}
            isActive={false}
          />
        ))}
      </div>
      <div className='ans--buttons'>
        <p className='score'>
          You scored {score}/{questionsData.length} correct answers
        </p>
        <button
          className={`play-again-btn ${theme}`}
          onClick={handlePlayAgainClick}>
          Play again
        </button>
      </div>
    </div>
  )
}
