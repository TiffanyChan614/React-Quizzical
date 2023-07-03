import Question from './Question'

export default function AnsPage({
	questionsData,
	displayedAnsData,
	score,
	handlePlayAgainClick,
}) {
	if (!questionsData) {
		return null
	}

	return (
		<div className='content'>
			<div className='answers'>
				{questionsData.map((quizQuestion, index) => (
					<Question
						quizQuestion={quizQuestion}
						key={quizQuestion.id}
						questionId={quizQuestion.id}
						handleAnswerClick={() => {}}
						displayedAns={
							displayedAnsData[index] ? displayedAnsData[index] : null
						}
						isActive={false}
					/>
				))}
			</div>
			<div className='result'>
				<p>You scored {score}/5 correct answers</p>
				<button
					className='play-again-btn'
					onClick={handlePlayAgainClick}>
					Play again
				</button>
			</div>
		</div>
	)
}
