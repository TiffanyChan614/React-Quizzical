import he from 'he'

export default function Question({ question }) {
	if (!question) {
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
		question.incorrectAnswers.concat(question.correctAnswer)
	)

	return (
		<div className='question'>
			<h2>{he.decode(question.question)}</h2>
			{answers.map((ans) => (
				<button
					className='ans-btn'
					key={ans}>
					{ans}
				</button>
			))}
		</div>
	)
}
