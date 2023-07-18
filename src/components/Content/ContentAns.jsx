import { useState, useContext, createContext } from 'react'
import { AppContext } from '../../App'
import Question from '../Question'
import UploadForm from '../UploadForm'
import { START_PAGE, INITIAL_SCORE } from '../../utils/constants'

export const AnsContext = createContext()

export default function ContentAns() {
  const {
    questionsData,
    setQuestionsData,
    score,
    setScore,
    setCurrentPage,
    setQuizPage,
    theme,
  } = useContext(AppContext)

  const [showForm, setShowForm] = useState(false)

  function handlePlayAgainClick() {
    setCurrentPage(START_PAGE)
    setQuizPage(START_PAGE)
    setQuestionsData([])
    setScore({ ...INITIAL_SCORE })
  }

  function toggleForm() {
    setShowForm((oldShowForm) => !oldShowForm)
  }

  if (!questionsData) {
    return null
  }

  return (
    <AnsContext.Provider value={{ toggleForm }}>
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
        <div className='ans--action'>
          <div className='ans--result'>
            <p>
              You scored {score['num-correct']}/{score['num-questions']} correct
              answers
            </p>
            <p>Your weighted score is {score.weightedScore}</p>
          </div>
          <div className='ans--buttons'>
            <button
              className={`play-again-btn ${theme}`}
              onClick={handlePlayAgainClick}>
              Play again
            </button>
            <button
              className={`upload-btn ${theme}`}
              onClick={toggleForm}>
              Upload your score
            </button>
            {showForm && <UploadForm />}
          </div>
        </div>
      </div>
    </AnsContext.Provider>
  )
}
