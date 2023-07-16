import { useState, useContext } from 'react'
import { AppContext } from '../../App'
import Question from '../common/Question'
import UploadForm from '../common/UploadForm'
// import { addDoc } from 'firebase/firestore'
// import { collection } from '../../utils/firebase'

export default function ContentAns() {
  const {
    questionsData,
    setQuestionsData,
    score,
    setScore,
    setCurrentPage,
    theme,
  } = useContext(AppContext)

  const [showForm, setShowForm] = useState(false)

  function handlePlayAgainClick() {
    setCurrentPage((oldPage) => (oldPage + 1) % 4)
    setQuestionsData([])
    setScore({
      'num-questions': 0,
      category: '',
      difficulty: '',
      type: '',
      score: 0,
    })
  }

  function toggleForm() {
    setShowForm((oldShowForm) => !oldShowForm)
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
        <button
          className={`upload-btn ${theme}`}
          onClick={toggleForm}>
          Upload your score
        </button>
        {showForm && <UploadForm />}
      </div>
    </div>
  )
}
