/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { AppContext } from '../../App'
import { fetchQuestions } from '../../services/QuizService'
import { formatQuestionsData } from '../../utils/helper'
import {
  INITIAL_FORM_DATA,
  INITIAL_SCORE,
  CATEGORIES,
  DIFFICULTIES,
  TYPES,
} from '../../utils/constants'
import he from 'he'

export default function ContentStart() {
  const {
    setCurrentPage,
    setQuizPage,
    formData,
    setFormData,
    setScore,
    setQuestionsData,
    theme,
  } = useContext(AppContext)

  function handleFormChange(event) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  async function handleStartSubmit(event) {
    event.preventDefault()
    if (formData['num-questions'] < 1 || formData['num-questions'] > 50) {
      alert('Please enter a number between 1 and 50')
    } else {
      setCurrentPage((oldPage) => (oldPage + 1) % 4)
      setQuizPage((oldPage) => (oldPage + 1) % 4)
      const questions = await fetchQuestions(formData)
      setQuestionsData(formatQuestionsData(questions))
      setScore({ ...INITIAL_SCORE })
      setFormData({ ...INITIAL_FORM_DATA })
    }
  }

  return (
    <div className='start content'>
      <h1>Quizzical</h1>
      <p>Are you ready to test your brain?</p>
      <form className={`form ${theme}`}>
        <label htmlFor='num-questions'>Number of questions:</label>
        <input
          type='number'
          id='num-questions'
          name='num-questions'
          placeholder='Enter a number between 1 and 50'
          value={
            formData['num-questions'] === 0 ? '' : formData['num-questions']
          }
          onChange={(event) => handleFormChange(event)}
        />
        <label htmlFor='category'>Category:</label>
        <select
          id='category'
          name='category'
          value={formData.category}
          onChange={handleFormChange}>
          {CATEGORIES.map((category) => {
            return (
              <option
                key={category.name}
                value={category.value}>
                {he.decode(category.name)}
              </option>
            )
          })}
        </select>
        <label htmlFor='difficulty'>Difficulty:</label>
        <select
          id='difficulty'
          name='difficulty'
          value={formData.difficulty}
          onChange={handleFormChange}>
          {DIFFICULTIES.map((difficulty) => {
            return (
              <option
                key={difficulty.name}
                value={difficulty.value}>
                {difficulty.name}
              </option>
            )
          })}
        </select>
        <label htmlFor='type'>Question type:</label>
        <select
          id='type'
          name='type'
          value={formData.type}
          onChange={handleFormChange}>
          {TYPES.map((type) => {
            return (
              <option
                key={type.name}
                value={type.value}>
                {type.name}
              </option>
            )
          })}
        </select>
        <button
          className={`start-btn ${theme}`}
          onClick={(event) => handleStartSubmit(event)}>
          Start quiz
        </button>
      </form>
    </div>
  )
}
