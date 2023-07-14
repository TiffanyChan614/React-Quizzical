/* eslint-disable react/prop-types */
import he from 'he'
import { useContext } from 'react'
import { AppContext } from '../App'

export default function Question({
  quizQuestion,
  questionId,
  displayedAns,
  isActive,
}) {
  const { setDisplayedAnsData, theme } = useContext(AppContext)

  if (!quizQuestion || !displayedAns) {
    return null
  }

  function handleAnswerClick(ansId) {
    setDisplayedAnsData((oldAns) =>
      oldAns.map((ansData, index) =>
        index === questionId
          ? ansData.map((ans) =>
              ans.id === ansId
                ? { ...ans, selected: true }
                : { ...ans, selected: false }
            )
          : ansData
      )
    )
  }

  return (
    <div className='quiz-question'>
      <h2 className='quiz-question--question'>
        {he.decode(quizQuestion.question)}
      </h2>
      <div className='quiz-question--answers'>
        {displayedAns.map((ans) => (
          <button
            className={`ans-btn ${theme} ${
              isActive && ans.selected ? 'selected' : ''
            } ${!isActive && ans.correct ? 'correct' : ''} ${
              !isActive && ans.selected && !ans.correct ? 'incorrect' : ''
            }`}
            key={ans.id}
            onClick={() => handleAnswerClick(ans.id)}
            disabled={!isActive}>
            {he.decode(ans.answer)}
          </button>
        ))}
      </div>
    </div>
  )
}
