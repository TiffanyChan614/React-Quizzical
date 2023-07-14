import { useContext } from 'react'
import { AppContext } from '../../App'
import Question from '../Question'

export default function AnsPage() {
  const {
    questionsData,
    displayedAnsData,
    setQuestionsData,
    setDisplayedAnsData,
    score,
    setScore,
    setCurrentPage,
    theme,
  } = useContext(AppContext)

  function handlePlayAgainClick() {
    setCurrentPage((oldPage) => (oldPage + 1) % 3)
    setQuestionsData([])
    setDisplayedAnsData([])
    localStorage.setItem('questionsData', [])
    localStorage.setItem('displayedAnsData', [])
    setScore(0)
  }

  if (!questionsData) {
    return null
  }

  return (
    <div className='ans content'>
      <div className='ans--questions'>
        {questionsData.map((quizQuestion, index) => (
          <Question
            quizQuestion={quizQuestion}
            key={quizQuestion.id}
            questionId={quizQuestion.id}
            handleAnswerClick={() => {}}
            displayedAns={
              displayedAnsData[index] ? displayedAnsData[index] : null
            }
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
