import he from 'he'

export default function Question({
  quizQuestion,
  handleAnswerClick,
  questionId,
  displayedAns,
  isActive,
}) {
  // console.log('rendering Question')
  if (!quizQuestion || !displayedAns) {
    return null
  }

  return (
    <div className='quiz-question'>
      <h2 className='quiz-question--question'>
        {he.decode(quizQuestion.question)}
      </h2>
      <div className='quiz-question--answers'>
        {displayedAns.map((ans) => (
          <button
            className={`ans-btn ${isActive && ans.selected ? 'selected' : ''} ${
              !isActive && ans.correct ? 'correct' : ''
            } ${!isActive && ans.selected && !ans.correct ? 'incorrect' : ''}`}
            key={ans.id}
            onClick={() => handleAnswerClick(questionId, ans.id)}
            disabled={!isActive}>
            {he.decode(ans.answer)}
          </button>
        ))}
      </div>
    </div>
  )
}
