import { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { AnsContext } from '../Content/ContentAns'
import {
  SCOREBOARD_PAGE,
  START_PAGE,
  ANS_PAGE,
  INITIAL_SCORE,
} from '../../utils/constants'
import { CATEGORIES, DIFFICULTIES, TYPES } from '../../utils/constants'
import { addDoc } from 'firebase/firestore'
import { scoreCollection } from '../../services/firebase'

export default function UploadForm() {
  const { setCurrentPage, setQuizPage, score, setScore, setNewlyAddedScore } =
    useContext(AppContext)

  const { toggleForm } = useContext(AnsContext)

  const [name, setName] = useState('')

  function handleCancelClick() {
    setCurrentPage(ANS_PAGE)
    toggleForm()
  }

  async function handleUploadClick(e) {
    e.preventDefault()
    setCurrentPage(SCOREBOARD_PAGE)
    setQuizPage(START_PAGE)
    const newScoreRef = await addDoc(scoreCollection, { name, score })
    setNewlyAddedScore(newScoreRef.id)
    setScore({ ...INITIAL_SCORE })
  }

  const selectedCategory = CATEGORIES.find(
    (category) => category.value === score.category
  )
  const selectedDifficulty = DIFFICULTIES.find(
    (difficulty) => difficulty.value === score.difficulty
  )
  const selectedType = TYPES.find((type) => type.value === score.type)

  return (
    <div className='upload-form'>
      <form onSubmit={handleUploadClick}>
        <h2>Your statistics</h2>
        <div className='statistics'>
          <p>
            <span className='statistics--field'>Your score:</span>{' '}
            {score['num-correct']}/{score['num-questions']}
          </p>

          <p>
            <span className='statistics--field'>Category:</span>{' '}
            {selectedCategory.name}
          </p>

          <p>
            <span className='statistics--field'>Difficult:</span>{' '}
            {selectedDifficulty.name}
          </p>

          <p>
            <span className='statistics--field'>Type:</span> {selectedType.name}
          </p>
          <p>
            <span className='statistics--field'>Weighted Score:</span>{' '}
            {score.weightedScore}
          </p>
        </div>
        <div className='name-input'>
          {' '}
          <label htmlFor='name'>Enter your Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            placeholder='name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='upload-buttons'>
          <button
            type='button'
            className='cancel-btn'
            onClick={handleCancelClick}>
            Cancel
          </button>
          <button
            type='submit'
            className='submit-btn'>
            Upload
          </button>
        </div>
      </form>
    </div>
  )
}
