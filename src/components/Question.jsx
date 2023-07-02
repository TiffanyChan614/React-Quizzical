import he from 'he'
import { useState, useEffect } from 'react'

export default function Question({
	quizQuestion,
	handleAnswerClick,
	id,
	selectedAnswers,
}) {
	const [answers, setAnswers] = useState([])

	console.log(selectedAnswers)

	useEffect(() => {
		setAnswers(
			shuffleArray(
				quizQuestion.incorrectAnswers.concat(quizQuestion.correctAnswer)
			)
		)
	}, [])

	if (!quizQuestion) {
		return null
	}

	function shuffleArray(array) {
		const shuffledArray = [...array]
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			const temp = shuffledArray[i]
			shuffledArray[i] = shuffledArray[j]
			shuffledArray[j] = temp
		}
		return shuffledArray
	}

	return (
		<div className='quiz-question'>
			<h2 className='question'>{he.decode(quizQuestion.question)}</h2>
			<div className='answers'>
				{answers.map((ans) => (
					<button
						className={`ans-btn ${
							selectedAnswers[id] === ans ? 'selected' : ''
						}`}
						key={ans}
						onClick={() => handleAnswerClick(id, ans)}>
						{he.decode(ans)}
					</button>
				))}
			</div>
		</div>
	)
}
