/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { AppContext } from '../../App'
import Question from '../common/Question'
import { START_PAGE, ANS_PAGE } from '../../utils/constants'

export default function ContentQuiz() {
  const {
    setCurrentPage,
    setQuizPage,
    questionsData,
    setQuestionsData,
    setScore,
    theme,
  } = useContext(AppContext)

  function handleBackClick() {
    setCurrentPage(START_PAGE)
    setQuizPage(START_PAGE)
    setQuestionsData([])
  }

  function handleCheckAnswersClick() {
    let score = 0
    let allAnswered = true
    questionsData.forEach((question) => {
      let answered = false
      question.answers.forEach((ans) => {
        if (ans.selected) {
          answered = true
        }
        if (ans.selected && ans.correct) {
          score++
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
    setScore((oldScore) => ({ ...oldScore, 'num-correct': score }))
    setCurrentPage(ANS_PAGE)
    setQuizPage(ANS_PAGE)
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
