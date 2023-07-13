import { useState, useEffect } from 'react'
import StartPage from './components/StartPage'
import QuizPage from './components/QuizPage'
import AnsPage from './components/AnsPage'
import { fetchQuestions } from './services/QuizService'

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
    category: '',
    difficulty: '',
    type: '',
  })

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

          const isTrueFalse =
            allAns.length === 2 &&
            ((allAns[0] === 'True' && allAns[1] === 'False') ||
              (allAns[0] === 'False' && allAns[1] === 'True'))
          console.log(
            'question',
            question.question,
            'is true/false:',
            isTrueFalse
          )

          if (isTrueFalse) {
            allAns.sort((a) => (a === 'True' ? -1 : 1))
          }

          const ansData = allAns.map((ans, ansId) => ({
            id: ansId,
            answer: ans,
            correct: ans === question.correctAnswer,
            selected: false,
          }))

          return isTrueFalse ? ansData : shuffleArray(ansData)
        })
      )
    }
  }, [questionsData])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  async function handleStartSubmit(event) {
    event.preventDefault()
    if (formData['num-questions'] < 1 || formData['num-questions'] > 50) {
      alert('Please enter a number between 1 and 50')
    } else {
      setCurrentPage((oldPage) => (oldPage + 1) % 3)
      const questionData = await fetchQuestions(formData)
      setQuestionsData(questionData)
    }
  }

  function handleAnswerClick(questionId, ansId) {
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

  function handleBackClick() {
    setCurrentPage((oldPage) => (oldPage - 1) % 3)
    setQuestionsData([])
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
    setQuestionsData([])
    setDisplayedAnsData([])
    setScore(0)
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
          handleBackClick={handleBackClick}
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
