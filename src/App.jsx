import { useState, useEffect } from 'react'
import StartPage from './components/StartPage'
import QuizPage from './components/QuizPage'
import AnsPage from './components/AnsPage'

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
	const [questionsData, setQuestionsData] = useState([])
	const [displayedAnsData, setDisplayedAnsData] = useState([])
	const [score, setScore] = useState(0)
	const [formData, setFormData] = useState({
		'num-questions': 0,
		difficulty: '',
		type: '',
	})

	const apiUrl = `https://opentdb.com/api.php?amount=${formData['num-questions']}&difficulty=${formData.difficulty}&type=${formData.type}`
	console.log('api url', apiUrl)

	function fetchQuestions() {
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
	}

	console.log('question data', questionsData)
	console.log('displayed ans data', displayedAnsData)

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
		console.log('Setting displayed ans data')
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

	function handleChange(event) {
		const { name, value } = event.target
		console.log('name', name, ':', value)
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			}
		})
	}

	console.log(JSON.stringify(formData))

	function handleStartSubmit(event) {
		event.preventDefault()
		if (formData['num-questions'] < 1 || formData['num-questions'] > 50) {
			alert('Please enter a number between 1 and 50')
		} else {
			setCurrentPage((oldPage) => (oldPage + 1) % 3)
			fetchQuestions()
		}
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

	function handleCheckAnswersClick() {
		let newScore = 0
		let allAnswered = true
		displayedAnsData.forEach((ansData) => {
			let answered = false
			ansData.forEach((ans) => {
				if (ans.selected) {
					answered = true
				}
				if (ans.selected && ans.correct) {
					newScore++
				}
			})
			if (!answered) {
				allAnswered = false
			}
		})
		if (!allAnswered) {
			alert('Please answer all questions')
			return
		}
		setScore(newScore)
		setCurrentPage((oldPage) => (oldPage + 1) % 3)
	}

	function handlePlayAgainClick() {
		setCurrentPage((oldPage) => (oldPage + 1) % 3)
		setQuestionsData(null)
		setDisplayedAnsData(null)
		setScore(0)
		fetchQuestions()
	}

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
				<StartPage
					handleSubmit={handleStartSubmit}
					handleChange={handleChange}
				/>
			)}
			{currentPage === QUIZ_PAGE && (
				<QuizPage
					questionsData={questionsData}
					handleAnswerClick={handleAnswerClick}
					displayedAnsData={displayedAnsData}
					handleCheckAnswersClick={handleCheckAnswersClick}
				/>
			)}
			{currentPage === ANS_PAGE && (
				<AnsPage
					questionsData={questionsData}
					displayedAnsData={displayedAnsData}
					score={score}
					handlePlayAgainClick={handlePlayAgainClick}
				/>
			)}
		</main>
	)
}

export default App
