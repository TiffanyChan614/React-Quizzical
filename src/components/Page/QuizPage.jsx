/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { AppContext } from '../../App'
import Question from '../Question'

export default function QuizPage() {
  const {
    setCurrentPage,
    questionsData,
    setQuestionsData,
    displayedAnsData,
    setFormData,
    setScore,
    theme,
  } = useContext(AppContext)

  function handleBackClick() {
    setCurrentPage((oldPage) => (oldPage - 1) % 3)
    setQuestionsData([])
    setFormData({ 'num-questions': 0, category: '', difficulty: '', type: '' })
    localStorage.setItem('questionsData', [])
    localStorage.setItem('displayedAnsData', [])
  }

  function handleCheckAnswersClick() {
    let newScore = 0
    let allAnswered = true
    displayedAnsData.forEach((ansData) => {
      let answered = false
      ansData.forEach((ans) => {
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
        {questionsData.map((quizQuestion, index) => (
          <Question
            quizQuestion={quizQuestion}
            key={quizQuestion.id}
            questionId={quizQuestion.id}
            displayedAns={
              displayedAnsData[index] ? displayedAnsData[index] : null
            }
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
