/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { AppContext } from '../../App'
import Question from '../Question'

export default function PageQuiz() {
  const { setCurrentPage, questionsData, setQuestionsData, setScore, theme } =
    useContext(AppContext)

  function handleBackClick() {
    setCurrentPage((oldPage) => (oldPage - 1) % 3)
    setQuestionsData([])
  }

  function handleCheckAnswersClick() {
    let newScore = 0
    let allAnswered = true
    questionsData.forEach((question) => {
      let answered = false
      question.answers.forEach((ans) => {
        if (ans.selected) {
          answered = true
        }
        if (ans.selected && ans.correct) {
          newScore++
        }
      })
      if (!answered) {
        allAnswered = false
      }
    })
    if (!allAnswered) {
      alert('Please answer all questions')
      return
    }
    setScore(newScore)
    setCurrentPage((oldPage) => (oldPage + 1) % 3)
  }

  if (!questionsData) {
    return null
  }

  return (
    <div className='quiz content'>
      <div className='quiz--questions'>
        {questionsData.map((question) => (
          <Question
            question={question}
            key={question.id}
            questionId={question.id}
            isActive={true}
          />
        ))}
      </div>
      <div className={`quiz--buttons ${theme}`}>
        <button
          className={`back-btn ${theme}`}
          onClick={handleBackClick}>
          Back
        </button>
        <button
          className={`check-btn ${theme}`}
          onClick={handleCheckAnswersClick}>
          Check answers
        </button>
      </div>
    </div>
  )
}
