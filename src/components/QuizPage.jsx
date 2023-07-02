import { useState, useEffect } from 'react'
import Question from './Question'

export default function QuizPage({
	questionsData,
	handleAnswerClick,
	selectedAnswers,
}) {
	console.log('selected answers in quiz page', selectedAnswers)
	return (
		<div className='content'>
			{questionsData.map((quizQuestion) => (
				<Question
					quizQuestion={quizQuestion}
					key={quizQuestion.id}
					id={quizQuestion.id}
					handleAnswerClick={handleAnswerClick}
					selectedAnswers={selectedAnswers}
				/>
			))}
			<button className='check-btn'>Check answers</button>
		</div>
	)
}
