/* eslint-disable react/prop-types */
import he from 'he'
import { useContext } from 'react'
import { AppContext } from '../App'

export default function Question({ question, questionId, isActive }) {
  const { setQuestionsData, theme } = useContext(AppContext)

  if (!question) {
    return null
  }

  function handleAnswerClick(ansId) {
    setQuestionsData((oldQuestions) =>
      oldQuestions.map((questionData) =>
        questionData.id === questionId
          ? {
              ...questionData,
              answers: questionData.answers.map((ans) =>
                ans.id === ansId ? { ...ans, selected: true } : ans
              ),
            }
          : questionData
      )
    )
  }

  return (
    <div className='quiz-question'>
      <h2 className='quiz-question--question'>{he.decode(question.title)}</h2>
      <div className='quiz-question--answers'>
        {question.answers.map((ans) => (
          <button
            className={`ans-btn ${theme} ${
              isActive && ans.selected ? 'selected' : ''
            } ${!isActive && ans.correct ? 'correct' : ''} ${
              !isActive && ans.selected && !ans.correct ? 'incorrect' : ''
            }`}
            key={ans.id}
            onClick={() => handleAnswerClick(ans.id)}
            disabled={!isActive}>
            {he.decode(ans.title)}
          </button>
        ))}
      </div>
    </div>
  )
}
