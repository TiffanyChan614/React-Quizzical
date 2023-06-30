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

	const apiUrl = 'https://opentdb.com/api.php?amount=5'

	useEffect(() => {
		fetch(apiUrl)
			.then((res) => res.json())
			.then((data) => {
				setQuestionsData(
					data.results.map((question) => {
						return {
							question: question.question,
							correctAnswer: question.correct_answer,
							incorrectAnswers: question.incorrect_answers,
						}
					})
				)
			})
	}, [])

	console.log('questionsData', questionsData)

	function handleClick() {
		setCurrentPage((oldPage) => (oldPage + 1) % 3)
	}

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
			{currentPage === START_PAGE && <StartPage handleClick={handleClick} />}
			{currentPage === QUIZ_PAGE && <QuizPage questionsData={questionsData} />}
		</main>
	)
}

export default App
