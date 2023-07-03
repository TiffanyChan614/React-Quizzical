/* eslint-disable react/prop-types */
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
		<div className='quiz content'>
			<div className='quiz--questions'>
				{questionsData.map((quizQuestion, index) => (
					<Question
						quizQuestion={quizQuestion}
						key={quizQuestion.id}
						questionId={quizQuestion.id}
						handleAnswerClick={handleAnswerClick}
						displayedAns={
							displayedAnsData[index] ? displayedAnsData[index] : null
						}
						isActive={true}
					/>
				))}
			</div>
			<div className='quiz--buttons'>
				<button
					className='check-btn'
					onClick={handleCheckAnswersClick}>
					Check answers
				</button>
			</div>
		</div>
	)
}
