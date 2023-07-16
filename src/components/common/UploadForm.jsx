import { useContext } from 'react'
import { AppContext } from '../../App'
import { SCOREBOARD_PAGE, START_PAGE } from '../../utils/constants'

export default function UploadForm() {
  const { setCurrentPage, setQuizPage, score, setScore } =
    useContext(AppContext)

  function handleCancelClick() {
    setCurrentPage(SCOREBOARD_PAGE)
    setQuizPage(START_PAGE)
    setScore({
      'num-questions': 0,
      category: '',
      difficulty: '',
      type: '',
      score: 0,
    })
  }

  function handleUploadClick() {
    setCurrentPage(SCOREBOARD_PAGE)
    setQuizPage(START_PAGE)
    alert('Uploaded!')
    setScore({
      'num-questions': 0,
      category: '',
      difficulty: '',
      type: '',
      score: 0,
    })
  }

  return (
    <div className='upload-form'>
      <form>
        <label htmlFor='name'>Your Name:</label>
        <input
          type='text'
          id='name'
          name='name'
        />
        <div>
          <p>
            Your score: {score.score}/{score['num-questions']}
          </p>

          <p>Category: {score.category}</p>

          <p>Difficult: {score.difficulty}</p>

          <p>Type: {score.type}</p>
          <p>
            The scoreboard is ranked by: percentage {`>`} difficulty {`>`} type{' '}
            {`>`} number of questions
          </p>
          <p>Wanna stay at the top? Answer MORE DIFFICULT MC questions!</p>
        </div>
        <button
          type='cancel'
          onClick={handleCancelClick}>
          Cancel
        </button>
        <button
          type='submit'
          onClick={handleUploadClick}>
          Upload
        </button>
      </form>
    </div>
  )
}
