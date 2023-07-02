import { useState, useEffect } from 'react'
import Question from './Question'

export default function QuizPage({ questionsData }) {
	console.log('quiz page runs')
	return (
		<div>
			{questionsData.map((question) => (
				<Question
					question={question}
					key={question.question}
				/>
			))}
		</div>
	)
}
