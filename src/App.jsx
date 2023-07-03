import { useState, useEffect } from 'react'
import StartPage from './components/StartPage'
import QuizPage from './components/QuizPage'

import yellowblob0 from './assets/yellowblob0.svg'
import yellowblob1 from './assets/yellowblob1.svg'
import yellowblob2 from './assets/yellowblob2.svg'
import blueblob0 from './assets/blueblob0.svg'
import blueblob1 from './assets/blueblob1.svg'
import blueblob2 from './assets/blueblob2.svg'

const START_PAGE = 0,
	QUIZ_PAGE = 1,
	ANS_PAGE = 2

function App() {
	const [currentPage, setCurrentPage] = useState(START_PAGE)
	const [questionsData, setQuestionsData] = useState(null)
	const [displayedAnsData, setDisplayedAnsData] = useState(null)

	const apiUrl = 'https://opentdb.com/api.php?amount=5'

	useEffect(() => {
		fetch(apiUrl)
			.then((res) => res.json())
			.then((data) => {
				setQuestionsData(
					data.results.map((question, index) => ({
						id: index,
						question: question.question,
						correctAnswer: question.correct_answer,
						incorrectAnswers: question.incorrect_answers,
					}))
				)
			})
	}, [])

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

	useEffect(() => {
		if (questionsData) {
			setDisplayedAnsData(
				questionsData.map((question) => {
					const allAns = question.incorrectAnswers.concat(
						question.correctAnswer
					)
					const ansData = allAns.map((ans, ansId) => ({
						id: ansId,
						answer: ans,
						correct: ans === question.correctAnswer,
						selected: false,
					}))
					return shuffleArray(ansData)
				})
			)
		}
	}, [questionsData])

	console.log('questionsData', questionsData)
	console.log('displayedAnsData', displayedAnsData)

	function handleStartClick() {
		setCurrentPage((oldPage) => (oldPage + 1) % 3)
	}

	function handleAnswerClick(questionId, ansId) {
		console.log('handleAnswerClick')
		setDisplayedAnsData((oldAns) =>
			oldAns.map((ansData, index) =>
				index === questionId
					? ansData.map((ans) =>
							ans.id === ansId
								? { ...ans, selected: true }
								: { ...ans, selected: false }
					  )
					: ansData
			)
		)
	}

	// function handleCheckAnswersClick() {
	// 	if (selectedAnswers.length !== 5) {
	// 		alert('Please answer all questions')
	// 		return
	// 	}
	// 	setCurrentPage((oldPage) => (oldPage + 1) % 3)
	// }

	console.log('currentPage', currentPage)

	const yellowBlobs = [yellowblob0, yellowblob1, yellowblob2]
	const blueBlobs = [blueblob0, blueblob1, blueblob2]

	return (
		<main>
			<img
				className='yellow-blob'
				src={yellowBlobs[currentPage]}
				alt='Yellow blob'
			/>
			<img
				className='blue-blob'
				src={blueBlobs[currentPage]}
				alt='Blue blob'
			/>
			{currentPage === START_PAGE && (
				<StartPage handleClick={handleStartClick} />
			)}
			{currentPage === QUIZ_PAGE && (
				<QuizPage
					questionsData={questionsData}
					handleAnswerClick={handleAnswerClick}
					displayedAnsData={displayedAnsData}
				/>
			)}
		</main>
	)
}

export default App
