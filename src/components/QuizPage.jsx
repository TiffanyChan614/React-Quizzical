import { useState, useEffect } from 'react'
import Question from './Question'

export default function QuizPage({ questionsData, handleAnswerClick }) {
	console.log('quiz page runs')
	return (
		<div className='content'>
			{questionsData.map((quizQuestion) => (
				<Question
					quizQuestion={quizQuestion}
					key={quizQuestion.question}
					id={questionsData.id}
					handleAnswerClick={handleAnswerClick}
				/>
			))}
			<button className='check-btn'>Check answers</button>
		</div>
	)
}
