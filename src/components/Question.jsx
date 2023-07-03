import he from 'he'
import { useState, useEffect } from 'react'

export default function Question({
	quizQuestion,
	handleAnswerClick,
	questionId,
	displayedAns,
}) {
	// console.log('rendering Question')
	if (!quizQuestion || !displayedAns) {
		return null
	}

	return (
		<div className='quiz-question'>
			<h2 className='question'>{he.decode(quizQuestion.question)}</h2>
			<div className='answers'>
				{displayedAns.map((ans) => (
					<button
						className={`ans-btn ${ans.selected ? 'selected' : ''}`}
						key={ans.id}
						onClick={() => handleAnswerClick(questionId, ans.id)}>
						{he.decode(ans.answer)}
					</button>
				))}
			</div>
		</div>
	)
}
