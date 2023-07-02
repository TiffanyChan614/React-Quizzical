import he from 'he'

export default function Question({ quizQuestion }) {
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

	const answers = shuffleArray(
		quizQuestion.incorrectAnswers.concat(quizQuestion.correctAnswer)
	)

	return (
		<div className='quiz-question'>
			<h2 className='question'>{he.decode(quizQuestion.question)}</h2>
			<div className='answers'>
				{answers.map((ans) => (
					<button
						className='ans-btn'
						key={ans}>
						{ans}
					</button>
				))}
			</div>
		</div>
	)
}
