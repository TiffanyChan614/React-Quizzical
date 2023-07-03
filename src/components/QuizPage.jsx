/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Question from './Question'

export default function QuizPage({
	questionsData,
	handleAnswerClick,
	displayedAnsData,
	handleCheckAnswersClick,
}) {
	if (!questionsData) {
		return null
	}

	// console.log('rendering QuizPage')

	return (
		<div className='content'>
			{questionsData.map((quizQuestion, index) => (
				<Question
					quizQuestion={quizQuestion}
					key={quizQuestion.id}
					questionId={quizQuestion.id}
					handleAnswerClick={handleAnswerClick}
					displayedAns={
						displayedAnsData[index] ? displayedAnsData[index] : null
					}
				/>
			))}
			<button
				className='check-btn'
				onClick={handleCheckAnswersClick}>
				Check answers
			</button>
		</div>
	)
}
