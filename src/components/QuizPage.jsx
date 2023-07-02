import { useState, useEffect } from 'react'
import Question from './Question'

export default function QuizPage({ questionsData }) {
	console.log('quiz page runs')
	return (
		<div className='content'>
			{questionsData.map((quizQuestion) => (
				<Question
					quizQuestion={quizQuestion}
					key={quizQuestion.question}
				/>
			))}
			<button className='check-btn'>Check answers</button>
		</div>
	)
}
