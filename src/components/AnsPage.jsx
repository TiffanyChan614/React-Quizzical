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
		<div className='ans content'>
			<div className='ans--questions'>
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
			<div className='ans--buttons'>
				<p className='score'>
					You scored {score}/{questionsData.length} correct answers
				</p>
				<button
					className='play-again-btn'
					onClick={handlePlayAgainClick}>
					Play again
				</button>
			</div>
		</div>
	)
}
