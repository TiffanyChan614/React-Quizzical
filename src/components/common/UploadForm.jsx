import { useContext, useState } from 'react'
import { AppContext } from '../../App'
import {
  SCOREBOARD_PAGE,
  START_PAGE,
  INITIAL_SCORE,
} from '../../utils/constants'
import { CATEGORIES, DIFFICULTIES, TYPES } from '../../utils/constants'
import { addDoc } from 'firebase/firestore'
import { scoreCollection } from '../../utils/firebase'

export default function UploadForm() {
  const { setCurrentPage, setQuizPage, score, setScore, setNewlyAddedScore } =
    useContext(AppContext)

  const [name, setName] = useState('')

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

  function handleUploadClick(e) {
    e.preventDefault()
    setCurrentPage(SCOREBOARD_PAGE)
    setQuizPage(START_PAGE)
    alert('Uploaded!')
    const newScoreRef = addDoc(scoreCollection, { score })
    setNewlyAddedScore({ id: newScoreRef.id })
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
        <div className='statistics'>
          <h2>Your statistics</h2>
          <p>
            Your score: {score['num-correct']}/{score['num-questions']}
          </p>

          <p>Category: {selectedCategory.name}</p>

          <p>Difficult: {selectedDifficulty.name}</p>

          <p>Type: {selectedType.name}</p>
          <p>Weighted Score: {score.weightedScore}</p>
        </div>
        <label htmlFor='name'>Enter your Name:</label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          placeholder='name'
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type='cancel'
          onClick={handleCancelClick}>
          Cancel
        </button>
        <button type='submit'>Upload</button>
      </form>
    </div>
  )
}
